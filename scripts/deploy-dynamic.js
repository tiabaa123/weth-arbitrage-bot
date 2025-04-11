async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying with:", deployer.address);

  const Arbitrage = await ethers.getContractFactory("WethArbitrageDynamic");
  const contract = await Arbitrage.deploy("0xYourAavePoolProvider", ethers.utils.parseEther("0.01"));
  await contract.deployed();

  console.log("Contract deployed to:", contract.address);
}

main();
