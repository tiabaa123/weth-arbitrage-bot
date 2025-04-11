async function main() {
  const hre = require("hardhat");
  await hre.run("verify:verify", {
    address: "0xYourContractAddress",
    constructorArguments: [
      "0xYourAaveProvider",
      "10000000000000000"
    ]
  });
}
main();
