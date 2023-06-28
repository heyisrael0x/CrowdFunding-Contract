const networkConfig = {
  11155111: {
    name: "sepolia",
  },
  31337: {
    name: "hardhat",
  },
  1337: {
    name: "ganache",
  },
};

const developmentChains = ["localhost", "hardhat", "ganache"];
const FRONTEND_ADDRESSES_FILE =
  "../Frontend/src/constants/contractAddress.json";
const FRONTEND_ABI_FILE = "../Frontend/src/constants/abi.json";


module.exports = {
  networkConfig,
  developmentChains,
  FRONTEND_ADDRESSES_FILE,
  FRONTEND_ABI_FILE
};
