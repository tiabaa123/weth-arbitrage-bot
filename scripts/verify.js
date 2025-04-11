const { run } = require("hardhat");
async function main() {
  const address = process.env.CONTRACT_ADDRESS;
  const args = [process.env.FLASHLOAN_PROVIDER, process.env.MIN_PROFIT_WEI];
  await run("verify:verify", {
    address,
    constructorArguments: args
  });
}
main().catch(console.error);
