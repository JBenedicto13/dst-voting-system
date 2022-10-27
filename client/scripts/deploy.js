const hre = require("hardhat");

async function main() {
  const Election = await hre.ethers.getContractFactory("Election");
  const election = await Election.deploy();
  await election.deployed();
  console.log("Smart Contract deployed to: ", election.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
