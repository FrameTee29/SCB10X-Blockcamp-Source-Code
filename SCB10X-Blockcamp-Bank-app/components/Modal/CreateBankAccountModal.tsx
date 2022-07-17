import * as Yup from "yup";
import { Button, CircularProgress, TextField } from "@mui/material";
import bankContractService from "@services/bankContract.service";
import { Form, Formik } from "formik";
import useBankContractStore from "store/useBankContract/useBankContractStore";
import useConnectorStore from "store/useConnector/useConnectorStore";
import { useState } from "react";
import useUIStore from "store/useUI/useUIStore";
import Swal from "sweetalert2";

const CreateBankAccountSchema = Yup.object().shape({
  accountName: Yup.string().required("Please enter your name."),
});

const CreateBankAccountModal = () => {
  const { closeModal } = useUIStore();
  const { isSupportNetwork } = useConnectorStore();
  const { createAccount, getAllMyAccount } = useBankContractStore();

  const [loading, setIsLoading] = useState<boolean>(false);

  const handleCreateAccount = async (value: { accountName: string }) => {
    if (isSupportNetwork) {
      setIsLoading(true);
      try {
        await createAccount(value.accountName);
        await getAllMyAccount();
        closeModal();
      } catch (err: any) {
        if (err.code === 4001) {
          console.log(err.message);
        } else {
          Swal.fire({
            icon: "error",
            text: "Must be unique bank accout name.",
          });
          closeModal();
        }
      }
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="text-2xl font-bold">Create bank account</div>
      <Formik
        validationSchema={CreateBankAccountSchema}
        initialValues={{ accountName: "" }}
        onSubmit={handleCreateAccount}
      >
        {({ errors, touched, values, handleBlur, handleChange }) => (
          <Form>
            <div className="mt-4">
              <TextField
                label="Account name"
                variant="standard"
                className="w-full"
                name="accountName"
                error={Boolean(touched.accountName && errors.accountName)}
                helperText={touched.accountName && errors.accountName}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.accountName}
              />
            </div>
            <div className="mt-4 text-right">
              <button
                type="submit"
                className="bg-pink-400 w-52 h-10 rounded-md hover:bg-pink-600 active:bg-pink-600 text-white font-bold"
              >
                {loading ? (
                  <CircularProgress className="text-white" size={20} />
                ) : (
                  "Submit"
                )}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateBankAccountModal;
