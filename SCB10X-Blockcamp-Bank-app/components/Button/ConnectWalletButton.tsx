import { ButtonHTMLAttributes, FC } from "react";

type ConnectWalletButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const ConnectWalletButton: FC<ConnectWalletButtonProps> = ({
  children,
  className,
  ...rest
}) => {
  return (
    <button
      className={`connect-wallet min-w-[120px] font-semibold text-sm  ${
        className ? className : "py-2 px-2 rounded-lg"
      }`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default ConnectWalletButton;
