const { ethers, network } = require("hardhat");
const fs = require("fs");
const {
  FRONTEND_ADDRESSES_FILE,
  FRONTEND_ABI_FILE,
} = require("../helper-hardhat-config");

module.exports = async function () {
  if (process.env.UPDATE_FRONTEND === "true") {
    console.log("Updating Frontend");
    updateContractAddresses();
    updateAbi();
    console.log("Frontend Updated");
  } else {
    console.log("Not-updating Frontend");
  }
};

const updateContractAddresses = async () => {
  const crowdFunding = await ethers.getContract("CrowdFunding");
  const chaindId = network.config.chainId.toString();
  const contractAddresses = JSON.parse(
    fs.readFileSync(FRONTEND_ADDRESSES_FILE),
    "utf8"
  );
  if (chaindId in contractAddresses) {
    if (!contractAddresses[chaindId].includes[crowdFunding.address]) {
      contractAddresses[chaindId].push(crowdFunding.address);
    }
  } else {
    contractAddresses[chaindId] = [crowdFunding.address];
  }
  fs.writeFileSync(FRONTEND_ADDRESSES_FILE, JSON.stringify(contractAddresses));
};

const updateAbi = async () => {
  const crowdFunding = await ethers.getContract("CrowdFunding");
  fs.writeFileSync(
    FRONTEND_ABI_FILE,
    crowdFunding.interface.format(ethers.utils.FormatTypes.json)
  );
};
