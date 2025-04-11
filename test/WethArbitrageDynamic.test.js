const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("WethArbitrageDynamic", function () {
  let contract, owner;

  beforeEach(async () => {
    [owner] = await ethers.getSigners();
    const Arbitrage = await ethers.getContractFactory("WethArbitrageDynamic");
    contract = await Arbitrage.deploy("0xYourAaveProvider", ethers.utils.parseEther("0.01"));
    await contract.deployed();
  });

  it("should set allowed token", async () => {
    await contract.setAllowedToken("0xToken", true);
    expect(await contract.allowedTokens("0xToken")).to.equal(true);
  });
});
