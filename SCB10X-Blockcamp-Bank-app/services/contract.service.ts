import { getSigner } from "@utils/getProvider";
import { TenXBank__factory } from "typechain-types";

export const bankContract = (address: string, signer = getSigner()) =>
  TenXBank__factory.connect(address, signer);
