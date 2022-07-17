import { tokenSupported } from "@config/constants/token-supported";
import {
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  FormControl,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { formatNumber } from "@utils/format";
import { Form, Formik } from "formik";
import { useState } from "react";
import useBankContractStore from "store/useBankContract/useBankContractStore";
import Swal from "sweetalert2";
import * as Yup from "yup";

const BankTransferSchema = Yup.object().shape({
  tokenAddress: Yup.string().required("Please select token."),
  from: Yup.string().required("Please enter from bank account name."),
  to: Yup.string().required("Please enter to bank account name."),
  amount: Yup.number()
    .required("Please enter your amount.")
    .test("", "Please enter number more than zero", (value) => {
      if (value) {
        return value > 0;
      }
      return false;
    }),
});

interface IBankTransferForm {
  tokenAddress: string;
  from: string;
  to: string;
  amount: number;
}

const initialValues = {
  tokenAddress: "",
  from: "",
  to: "",
  amount: 0,
};

const BankTransferForm = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const [multiTransfer, setMultiTransfer] = useState<IBankTransferForm[]>([]);
  const { batchBankTransfer, getAllMyAccount } = useBankContractStore();

  const [loading, setLoading] = useState(false);

  const handleOpenModal = () => {
    setVisible(true);
  };

  const handleCloseModal = () => {
    setVisible(false);
  };

  const handleSubmit = (value: IBankTransferForm) => {
    setMultiTransfer([...multiTransfer, value]);
    handleCloseModal();
  };

  const handleBatchTransfer = async () => {
    if (multiTransfer.length > 0) {
      const lengthData = multiTransfer.length;
      const tokenAddressArr = multiTransfer.map((f) => f.tokenAddress);
      const senderNameArr = multiTransfer.map((f) => f.from);
      const recipientName = multiTransfer.map((f) => f.to);
      const amountArr = multiTransfer.map((f) => f.amount);
      if (
        tokenAddressArr.length === lengthData &&
        senderNameArr.length === lengthData &&
        recipientName.length === lengthData &&
        amountArr.length === lengthData
      ) {
        setLoading(true);

        try {
          await batchBankTransfer(
            tokenAddressArr,
            senderNameArr,
            recipientName,
            amountArr
          );
          await getAllMyAccount()
          Swal.fire({
            text: "Transfer successfully",
            icon: "success",
            confirmButtonText: "Ok",
          });
          setMultiTransfer([]);
        } catch (err) {}
        setLoading(false);
      }
    }
  };

  const displayToken = (tokenAddress: string) => {
    const tokenData = tokenSupported.find((f) => f.address === tokenAddress);
    return (
      <div className="flex items-center">
        <img src={tokenData?.image} className="w-7 h-7" />
        <div className="font-semibold text-white ml-2">{tokenData?.symbol}</div>
      </div>
    );
  };

  return (
    <div className="w-full rounded-lg p-4 bg-secondary text-purple1 space-y-5 border border-purple2">
      <div className="flex justify-between items-center">
        <div className="font-bold mb-2"> Multi transfer</div>

        <div className="space-x-2">
          <button
            type="submit"
            className="bg-red-700 hover:bg-red-500 text-white px-2 py-1 rounded-md text-md font-medium tracking-wider"
            onClick={() => setMultiTransfer([])}
          >
            CLEAR
          </button>
          <button
            type="submit"
            className="bg-blue-700 hover:bg-blue-500 text-white px-2 py-1 rounded-md  text-md font-medium tracking-wider"
            onClick={handleOpenModal}
          >
            ADD
          </button>
        </div>
      </div>

      {multiTransfer.length === 0 ? (
        <div className="flex w-full justify-center items-center border py-4 rounded-md border-gray-600 text-gray-600">
          No Orders
        </div>
      ) : (
        <div className="space-y-4">
          {multiTransfer?.map((item, index) => {
            return (
              <div
                key={index}
                className="px-4 py-2 rounded-lg space-y-2 border-purple1 border-2"
              >
                <div className="flex justify-between items-center">
                  <div className="text-white font-semibold">from</div>
                  <div className="font-semibold text-pink-500">{item.from}</div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-white font-semibold">to</div>
                  <div className="font-semibold text-pink-500">{item.to}</div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-white font-semibold">token</div>
                  {displayToken(item.tokenAddress)}
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-white font-semibold">amount</div>
                  <div className="text-green1 font-bold">
                    {formatNumber(item.amount)}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
      <button
        type="submit"
        className="bg-purple1 hover:bg-purple-700 active:bg-purple-700 w-full h-12 text-white rounded-md font-bold"
        onClick={handleBatchTransfer}
      >
        {loading ? (
          <CircularProgress className="text-white" size={20} />
        ) : (
          "TRANSFER"
        )}
      </button>
      <Dialog fullWidth open={visible} onClose={handleCloseModal}>
        <DialogContent>
          <div className="text-2xl font-bold mb-4">Transfer</div>
          <Formik
            validationSchema={BankTransferSchema}
            initialValues={initialValues}
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
                  <div className="font-bold mb-2">From</div>
                  <TextField
                    variant="outlined"
                    className="w-full"
                    name="from"
                    error={Boolean(touched.from && errors.from)}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.from}
                  />
                  <div className="text-xs mt-2 text-red-500">
                    {touched.from && errors.from}
                  </div>
                </div>
                <div className="mb-4">
                  <div className="font-bold mb-2">To</div>
                  <TextField
                    variant="outlined"
                    className="w-full"
                    name="to"
                    error={Boolean(touched.to && errors.to)}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.to}
                  />
                  <div className="text-xs mt-2 text-red-500">
                    {touched.to && errors.to}
                  </div>
                </div>
                <div className="mt-4 mb-4">
                  <div className="font-bold mb-2">Token</div>
                  <FormControl fullWidth>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={values.tokenAddress}
                      onChange={(e) => {
                        setFieldValue("tokenAddress", e.target.value);
                      }}
                      className="bg-white text-black"
                    >
                      {tokenSupported.map((item) => (
                        <MenuItem value={item.address} key={item.address}>
                          <div className="flex items-center space-x-3">
                            <img src={item.image} className="w-8 h-8" />
                            <div>{item.symbol}</div>
                          </div>
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <div className="text-xs mt-2 text-red-500">
                    {touched.tokenAddress && errors.tokenAddress}
                  </div>
                </div>
                <div className="mb-4">
                  <div className="font-bold mb-2">Amount</div>
                  <TextField
                    variant="outlined"
                    className="w-full"
                    name="amount"
                    type="number"
                    error={Boolean(touched.amount && errors.amount)}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.amount}
                  />
                  <div className="text-xs mt-2 text-red-500">
                    {touched.amount && errors.amount}
                  </div>
                </div>
                <button
                  type="submit"
                  className="bg-purple1 hover:bg-purple-700 w-full h-12 mt-2 text-white rounded-md"
                >
                  Add
                </button>
              </Form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BankTransferForm;
