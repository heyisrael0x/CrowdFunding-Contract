const { ethers } = require("hardhat");
const title = "My Startup";
const description =
  "I need to pay my school fee for the coming session. Please donate Thanks ser";
const target = "1000000000000000000";
const deadline = "20012348632832";
const image = "http://localhost:5173/src/assets/image.jpg";
const id = 0;
const main = async () => {
  const crowdFunding = await ethers.getContract("CrowdFunding");
  console.log("getting campaigns");
  console.log(crowdFunding.address);
  const tx = await crowdFunding.getDonators(
    id
    // title,
    // description,
    // target,
    // deadline,
    // image
  );
  // await tx.wait(1);

  console.log(tx);
  console.log("Got Campaigns");
};
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
