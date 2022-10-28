require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  paths: {
    artifacts: "./src/artifacts",
  },
  networks: {
    mumbai: {
      url: process.env.PUBLIC_URL,
      accounts: [`0x${process.env.PRIVATE_KEY}`]
    }
  }
};
