import { tokenSupported } from "@config/constants/token-supported";
import { ITokenOptions } from "types/addToken.interface";

const AddTokenSupport = () => {
  const handleAddToken = async (option: ITokenOptions) => {
    await window.ethereum.request({
      method: "wallet_watchAsset",
      params: {
        type: "ERC20", // Initially only supports ERC20, but eventually more!
        options: option,
      },
    });
  };

  return (
    <div className="flex flex-col">
      <div className="font-bold mb-3">Token Support</div>
      <div className="flex space-x-3">
        {tokenSupported.map((item) => {
          return (
            <div key={item.address} onClick={() => handleAddToken(item)}>
              <img src={item.image} className="w-12 h-12 cursor-pointer" />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AddTokenSupport;
