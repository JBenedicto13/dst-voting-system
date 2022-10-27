require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  paths: {
    artifacts: "./src/artifacts",
  },
  networks: {
    polygon: {
      url: "https://polygon-mumbai.g.alchemy.com/v2/RgHgMqrAtERcs8AqOVB4IXj02qPxF6x0",
      accounts: [`0x${process.env.PRIVATE_KEY}`]
    }
  }
};
