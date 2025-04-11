// scripts/deploy-dynamic.js
const hre = require("hardhat");
require("dotenv").config();

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("🚀 Deploying contracts with:", deployer.address);

  const Arbitrage = await hre.ethers.getContractFactory("WethArbitrageDynamic");
  const contract = await Arbitrage.deploy(
    process.env.AAVE_PROVIDER,
    hre.ethers.utils.parseEther(process.env.MIN_PROFIT_ETH || "0.01")
  );
  await contract.deployed();

  console.log("✅ Contract deployed to:", contract.address);
}

main().catch((error) => {
  console.error("❌ Deployment failed:", error);
  process.exitCode = 1;
});
