/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../common";

export interface TenXBankInterface extends utils.Interface {
  functions: {
    "account(address,uint256)": FunctionFragment;
    "bankTransfer(address,string,string,uint256)": FunctionFragment;
    "batchBankTransfer(address[],string[],string[],uint256[])": FunctionFragment;
    "claimer()": FunctionFragment;
    "collectFees(address,uint256,address)": FunctionFragment;
    "createAccount(string)": FunctionFragment;
    "deposit(address,string,uint256)": FunctionFragment;
    "feePercentage()": FunctionFragment;
    "getAllMyAccount()": FunctionFragment;
    "nameAccount(string)": FunctionFragment;
    "nameBalanceOf(string)": FunctionFragment;
    "numberOfAccount()": FunctionFragment;
    "owner()": FunctionFragment;
    "setClaimer(address)": FunctionFragment;
    "setFee(uint256)": FunctionFragment;
    "tokenAccountBalanceOf(address,string)": FunctionFragment;
    "tokenFee(address)": FunctionFragment;
    "withdraw(address,string,uint256)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "account"
      | "bankTransfer"
      | "batchBankTransfer"
      | "claimer"
      | "collectFees"
      | "createAccount"
      | "deposit"
      | "feePercentage"
      | "getAllMyAccount"
      | "nameAccount"
      | "nameBalanceOf"
      | "numberOfAccount"
      | "owner"
      | "setClaimer"
      | "setFee"
      | "tokenAccountBalanceOf"
      | "tokenFee"
      | "withdraw"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "account",
    values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "bankTransfer",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "batchBankTransfer",
    values: [
      PromiseOrValue<string>[],
      PromiseOrValue<string>[],
      PromiseOrValue<string>[],
      PromiseOrValue<BigNumberish>[]
    ]
  ): string;
  encodeFunctionData(functionFragment: "claimer", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "collectFees",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<string>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "createAccount",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "deposit",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "feePercentage",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getAllMyAccount",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "nameAccount",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "nameBalanceOf",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "numberOfAccount",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "setClaimer",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "setFee",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "tokenAccountBalanceOf",
    values: [PromiseOrValue<string>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "tokenFee",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "withdraw",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;

  decodeFunctionResult(functionFragment: "account", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "bankTransfer",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "batchBankTransfer",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "claimer", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "collectFees",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "createAccount",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "deposit", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "feePercentage",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getAllMyAccount",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "nameAccount",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "nameBalanceOf",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "numberOfAccount",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "setClaimer", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "setFee", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "tokenAccountBalanceOf",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "tokenFee", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "withdraw", data: BytesLike): Result;

  events: {
    "CreateAccount(address,string)": EventFragment;
    "Deposit(address,address,string,uint256)": EventFragment;
    "Withdraw(address,address,string,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "CreateAccount"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Deposit"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Withdraw"): EventFragment;
}

export interface CreateAccountEventObject {
  ownerAddress: string;
  name: string;
}
export type CreateAccountEvent = TypedEvent<
  [string, string],
  CreateAccountEventObject
>;

export type CreateAccountEventFilter = TypedEventFilter<CreateAccountEvent>;

export interface DepositEventObject {
  token: string;
  depositor: string;
  name: string;
  amount: BigNumber;
}
export type DepositEvent = TypedEvent<
  [string, string, string, BigNumber],
  DepositEventObject
>;

export type DepositEventFilter = TypedEventFilter<DepositEvent>;

export interface WithdrawEventObject {
  token: string;
  withdrawal: string;
  name: string;
  amount: BigNumber;
}
export type WithdrawEvent = TypedEvent<
  [string, string, string, BigNumber],
  WithdrawEventObject
>;

export type WithdrawEventFilter = TypedEventFilter<WithdrawEvent>;

export interface TenXBank extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: TenXBankInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    account(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[string]>;

    bankTransfer(
      token: PromiseOrValue<string>,
      senderName: PromiseOrValue<string>,
      recipientName: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    batchBankTransfer(
      tokens: PromiseOrValue<string>[],
      sendersName: PromiseOrValue<string>[],
      recipientsName: PromiseOrValue<string>[],
      amounts: PromiseOrValue<BigNumberish>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    claimer(overrides?: CallOverrides): Promise<[string]>;

    collectFees(
      token: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      recipient: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    createAccount(
      name: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    deposit(
      token: PromiseOrValue<string>,
      name: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    feePercentage(overrides?: CallOverrides): Promise<[BigNumber]>;

    getAllMyAccount(overrides?: CallOverrides): Promise<[string[]]>;

    nameAccount(
      name: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[string]>;

    nameBalanceOf(
      name: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    numberOfAccount(overrides?: CallOverrides): Promise<[BigNumber]>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    setClaimer(
      newClaimer: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    setFee(
      percentage: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    tokenAccountBalanceOf(
      token: PromiseOrValue<string>,
      name: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    tokenFee(
      token: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    withdraw(
      token: PromiseOrValue<string>,
      name: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  account(
    arg0: PromiseOrValue<string>,
    arg1: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<string>;

  bankTransfer(
    token: PromiseOrValue<string>,
    senderName: PromiseOrValue<string>,
    recipientName: PromiseOrValue<string>,
    amount: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  batchBankTransfer(
    tokens: PromiseOrValue<string>[],
    sendersName: PromiseOrValue<string>[],
    recipientsName: PromiseOrValue<string>[],
    amounts: PromiseOrValue<BigNumberish>[],
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  claimer(overrides?: CallOverrides): Promise<string>;

  collectFees(
    token: PromiseOrValue<string>,
    amount: PromiseOrValue<BigNumberish>,
    recipient: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  createAccount(
    name: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  deposit(
    token: PromiseOrValue<string>,
    name: PromiseOrValue<string>,
    amount: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  feePercentage(overrides?: CallOverrides): Promise<BigNumber>;

  getAllMyAccount(overrides?: CallOverrides): Promise<string[]>;

  nameAccount(
    name: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<string>;

  nameBalanceOf(
    name: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  numberOfAccount(overrides?: CallOverrides): Promise<BigNumber>;

  owner(overrides?: CallOverrides): Promise<string>;

  setClaimer(
    newClaimer: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  setFee(
    percentage: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  tokenAccountBalanceOf(
    token: PromiseOrValue<string>,
    name: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  tokenFee(
    token: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  withdraw(
    token: PromiseOrValue<string>,
    name: PromiseOrValue<string>,
    amount: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    account(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<string>;

    bankTransfer(
      token: PromiseOrValue<string>,
      senderName: PromiseOrValue<string>,
      recipientName: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    batchBankTransfer(
      tokens: PromiseOrValue<string>[],
      sendersName: PromiseOrValue<string>[],
      recipientsName: PromiseOrValue<string>[],
      amounts: PromiseOrValue<BigNumberish>[],
      overrides?: CallOverrides
    ): Promise<void>;

    claimer(overrides?: CallOverrides): Promise<string>;

    collectFees(
      token: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      recipient: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    createAccount(
      name: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    deposit(
      token: PromiseOrValue<string>,
      name: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    feePercentage(overrides?: CallOverrides): Promise<BigNumber>;

    getAllMyAccount(overrides?: CallOverrides): Promise<string[]>;

    nameAccount(
      name: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<string>;

    nameBalanceOf(
      name: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    numberOfAccount(overrides?: CallOverrides): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<string>;

    setClaimer(
      newClaimer: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    setFee(
      percentage: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    tokenAccountBalanceOf(
      token: PromiseOrValue<string>,
      name: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    tokenFee(
      token: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    withdraw(
      token: PromiseOrValue<string>,
      name: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "CreateAccount(address,string)"(
      ownerAddress?: null,
      name?: null
    ): CreateAccountEventFilter;
    CreateAccount(ownerAddress?: null, name?: null): CreateAccountEventFilter;

    "Deposit(address,address,string,uint256)"(
      token?: null,
      depositor?: null,
      name?: null,
      amount?: null
    ): DepositEventFilter;
    Deposit(
      token?: null,
      depositor?: null,
      name?: null,
      amount?: null
    ): DepositEventFilter;

    "Withdraw(address,address,string,uint256)"(
      token?: null,
      withdrawal?: null,
      name?: null,
      amount?: null
    ): WithdrawEventFilter;
    Withdraw(
      token?: null,
      withdrawal?: null,
      name?: null,
      amount?: null
    ): WithdrawEventFilter;
  };

  estimateGas: {
    account(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    bankTransfer(
      token: PromiseOrValue<string>,
      senderName: PromiseOrValue<string>,
      recipientName: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    batchBankTransfer(
      tokens: PromiseOrValue<string>[],
      sendersName: PromiseOrValue<string>[],
      recipientsName: PromiseOrValue<string>[],
      amounts: PromiseOrValue<BigNumberish>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    claimer(overrides?: CallOverrides): Promise<BigNumber>;

    collectFees(
      token: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      recipient: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    createAccount(
      name: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    deposit(
      token: PromiseOrValue<string>,
      name: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    feePercentage(overrides?: CallOverrides): Promise<BigNumber>;

    getAllMyAccount(overrides?: CallOverrides): Promise<BigNumber>;

    nameAccount(
      name: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    nameBalanceOf(
      name: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    numberOfAccount(overrides?: CallOverrides): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    setClaimer(
      newClaimer: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    setFee(
      percentage: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    tokenAccountBalanceOf(
      token: PromiseOrValue<string>,
      name: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    tokenFee(
      token: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    withdraw(
      token: PromiseOrValue<string>,
      name: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    account(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    bankTransfer(
      token: PromiseOrValue<string>,
      senderName: PromiseOrValue<string>,
      recipientName: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    batchBankTransfer(
      tokens: PromiseOrValue<string>[],
      sendersName: PromiseOrValue<string>[],
      recipientsName: PromiseOrValue<string>[],
      amounts: PromiseOrValue<BigNumberish>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    claimer(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    collectFees(
      token: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      recipient: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    createAccount(
      name: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    deposit(
      token: PromiseOrValue<string>,
      name: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    feePercentage(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getAllMyAccount(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    nameAccount(
      name: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    nameBalanceOf(
      name: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    numberOfAccount(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    setClaimer(
      newClaimer: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    setFee(
      percentage: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    tokenAccountBalanceOf(
      token: PromiseOrValue<string>,
      name: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    tokenFee(
      token: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    withdraw(
      token: PromiseOrValue<string>,
      name: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}