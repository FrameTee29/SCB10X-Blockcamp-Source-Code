import { tokenSupported } from "@config/constants/token-supported";
import {
  Button,
  CircularProgress,
  FormControl,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import useBankContractStore from "store/useBankContract/useBankContractStore";
import { ITokenOptions } from "types/addToken.interface";
import { TestERC20__factory } from "typechain-types";
import addressList from "@config/constants/address-list";
import { getSigner } from "@utils/getProvider";
import useConnectorStore from "store/useConnector/useConnectorStore";
import { ethers } from "ethers";
import Swal from "sweetalert2";

const DepositTokenSchema = Yup.object().shape({
  tokenAddress: Yup.string().required("Please select token."),
  accountName: Yup.string().required("Please select your account."),
  amount: Yup.number()
    .required("Please enter your amount.")
    .test("", "Please enter number", (value) => {
      if (value) {
        return value > 0;
      }
      return false;
    }),
});

const initialValue: {
  tokenAddress: string;
  accountName: string;
  amount: number;
} = {
  tokenAddress: "",
  accountName: "",
  amount: 0,
};

const DepositForm = () => {
  const { currentAccount } = useConnectorStore();
  const { allAccount, deposit, getAllMyAccount } = useBankContractStore();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isAllowance, setIsAllowance] = useState<boolean>(false);

  const [token, setToken] = useState<ITokenOptions>({
    address: "",
    symbol: "",
    decimals: 0,
    image: "",
  });

  const handleSubmit = async (value: {
    tokenAddress: string;
    accountName: string;
    amount: number;
  }) => {
    setIsLoading(true);
    try {
      const balanceAllowance = await getAllowance(value.tokenAddress);
      if (balanceAllowance < value.amount) {
        await handleApprove(value.tokenAddress);
      }
      await deposit(value.tokenAddress, value.accountName, value.amount);
      await getAllMyAccount();
      Swal.fire({
        text: "Deposit successfully",
        icon: "success",
        confirmButtonText: "Ok",
      });
    } catch (err) {}
    setIsLoading(false);
  };

  const handleApprove = async (addressToken: string) => {
    const contractToken = await TestERC20__factory.connect(
      addressToken,
      getSigner()
    );
    const tx = await contractToken.approve(
      addressList["0x4"].Bank,
      ethers.constants.MaxUint256
    );
    await tx.wait();
  };

  const getAllowance = async (addressToken: string) => {
    const contractToken = await TestERC20__factory.connect(
      addressToken,
      getSigner()
    );
    const allowance = await contractToken.allowance(
      currentAccount,
      addressList["0x4"].Bank
    );
    return Number(ethers.utils.formatUnits(allowance));
  };

  return (
    <div className=" w-full rounded-lg p-4 bg-secondary text-purple1 space-y-5 border border-purple2">
      <Formik
        validationSchema={DepositTokenSchema}
        initialValues={initialValue}
        onSubmit={handleSubmit}
      >
        {({
          errors,
          touched,
          values,
          handleBlur,
          handleChange,
          setFieldValue,
        }) => (
          <Form>
            <div className="mb-4">
              <div className="font-bold">Token</div>
              <div className="mt-2 flex space-x-4">
                {tokenSupported.map((item) => {
                  return (
                    <div
                      className={`flex flex-col justify-center item.center px-3 pt-4 pb-2 rounded-xl border cursor-pointer border-purple-400 hover:bg-purple-700 ${
                        token.address === item.address
                          ? "bg-purple-700"
                          : "bg-secondary"
                      }`}
                      key={item.address}
                      onClick={() => {
                        setFieldValue("tokenAddress", item.address);
                        setToken(item);
                      }}
                    >
                      <img src={item.image} className="w-14 h-14" />
                      <div className="text-center mt-2 text-sm font-bold text-white">
                        {item.symbol}
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="text-red-500">
                {touched.tokenAddress && errors.tokenAddress}
              </div>
            </div>
            <div className="mb-4">
              <div className="font-bold mb-2">Account name</div>
              <FormControl fullWidth>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={values.accountName}
                  onChange={(e) => setFieldValue("accountName", e.target.value)}
                  className="bg-white text-black"
                >
                  {allAccount.map((item) => (
                    <MenuItem value={item} key={item}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {Boolean(touched.accountName && errors.accountName)}
              <div className="text-red-500">
                {touched.accountName && errors.accountName}
              </div>
            </div>

            <div className="mb-4">
              <div className="font-bold mb-2">Amount</div>
              <TextField
                className="bg-white text-white w-full"
                type="number"
                name="amount"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.amount}
              ></TextField>
              <div className="text-red-500">
                {touched.accountName && errors.accountName}
              </div>
            </div>
            <button
              type="submit"
              className="bg-purple1 hover:bg-purple-700 active:bg-purple-700 w-full h-12 text-white rounded-md font-bold"
            >
              {isLoading ? (
                <CircularProgress className="text-white" size={20} />
              ) : (
                "SUBMIT"
              )}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default DepositForm;
