import hre, { ethers } from "hardhat";
import addressUtils from "../utils/addresses";

async function main() {
  const owner = "0xa58DD04c4a30A1437974E4BfDfb1815177d8b5FA";
  const claimer = "0xa58DD04c4a30A1437974E4BfDfb1815177d8b5FA";

  const TenXBank = await ethers.getContractFactory("TenXBank");
  const tenXBank = await TenXBank.deploy(owner, claimer);

  await tenXBank.deployed();

  console.log("Deployed 10XBank at: ", tenXBank.address);

  await addressUtils.saveAddresses(hre.network.name, {
    TenXBank: tenXBank.address,
  });
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
