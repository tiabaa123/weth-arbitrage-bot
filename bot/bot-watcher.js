// bot/bot-watcher.js
import { ethers } from "ethers";
import dotenv from "dotenv";
dotenv.config();

const provider = new ethers.providers.WebSocketProvider(process.env.ARBITRUM_WSS);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

const contract = new ethers.Contract(process.env.CONTRACT_ADDRESS, [
  "function initiateArbitrage(address tokenIn, address tokenOut) external",
  "function getPrice(address token) view returns (uint256)",
  "function minProfit() view returns (uint256)"
], wallet);

const USDC = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";
const WETH = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
const ROUTES = [
  { tokenIn: USDC, tokenOut: WETH },
  { tokenIn: WETH, tokenOut: USDC },
];

async function tryArbitrage(route) {
  try {
    const minProfit = await contract.minProfit();
    const oracleIn = await contract.getPrice(route.tokenIn);
    const oracleOut = await contract.getPrice(route.tokenOut);

    const oracleDiff = Math.abs(oracleIn - oracleOut);
    const oracleThreshold = (oracleIn * 5n) / 100n;

    if (oracleDiff < oracleThreshold) {
      const tx = await contract.initiateArbitrage(route.tokenIn, route.tokenOut);
      console.log("🚀 Arbitrage triggered:", tx.hash);
      await tx.wait();
      console.log("✅ Confirmed");
    } else {
      console.log("🛑 Oracle price divergence too high, skipping");
    }
  } catch (err) {
    console.error("❌ Arbitrage error:", err.message);
  }
}

provider.on("block", async (blockNumber) => {
  console.log("🔔 New block:", blockNumber);
  for (const route of ROUTES) {
    await tryArbitrage(route);
  }
});
