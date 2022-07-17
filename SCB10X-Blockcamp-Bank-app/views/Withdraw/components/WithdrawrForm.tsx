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
import { useState } from "react";
import * as Yup from "yup";
import useBankContractStore from "store/useBankContract/useBankContractStore";
import { ITokenOptions } from "types/addToken.interface";
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

const WithdrawForm = () => {
  const { allAccount, withdraw, deposit, tokenAccountBalanceOf , getAllMyAccount } =
    useBankContractStore();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [tokenBalanceOf, setTokenBalanceOf] = useState<{
    address: string;
    balance: number;
  }>({ address: "", balance: 0 });

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
      await withdraw(value.tokenAddress, value.accountName, value.amount);
      await getBalance(value.tokenAddress, value.accountName);
      await getAllMyAccount();
      Swal.fire({
        text: "Withdraw successfully",
        icon: "success",
        confirmButtonText: "Ok",
      });
    } catch (err) {}
    setIsLoading(false);
  };

  const handleSetToken = async (item: ITokenOptions, accountName: string) => {
    setToken(item);
    await getBalance(item.address, accountName);
  };

  const getBalance = async (addressToken: string, accountName: string) => {
    const data = await tokenAccountBalanceOf(addressToken, accountName);
    setTokenBalanceOf({ address: addressToken, balance: data });
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
              <div className="font-bold mb-2"> Withdraw from account name</div>
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
                        handleSetToken(item, values.accountName);
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
              <div className="font-bold mt-2 text-green1">
                Balance: {tokenBalanceOf.balance}
              </div>
              <div className="text-red-500">
                {touched.tokenAddress && errors.tokenAddress}
              </div>
            </div>

            <div className="mb-4">
              <div className="font-bold mb-2">Amount</div>
              <TextField
                className="bg-white w-full text-white"
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

export default WithdrawForm;
