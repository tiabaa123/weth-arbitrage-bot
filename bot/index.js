require("dotenv").config();
const { ethers } = require("ethers");

const abi = require("../artifacts/contracts/WethArbitrageDynamic.sol/WethArbitrageDynamic.json").abi;
const provider = new ethers.providers.JsonRpcProvider(process.env.ARBITRUM_RPC);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const contract = new ethers.Contract(process.env.CONTRACT_ADDRESS, abi, wallet);

async function main() {
  provider.on("block", async (blockNumber) => {
    console.log("[BLOCK]", blockNumber);
    const profitable = Math.random() > 0.95;

    if (profitable) {
      const token = process.env.FLASHLOAN_TOKEN;
      const amount = ethers.utils.parseEther("0.5");

      console.log("[EXEC] Flashloan trigger...");
      const tx = await contract.initiateFlashloan(token, amount);
      console.log("TX sent:", tx.hash);
    }
  });
}
main().catch(console.error);
