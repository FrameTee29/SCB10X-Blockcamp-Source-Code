import { ethers } from "hardhat";
import { expect } from "chai";
import { parseEther, formatUnits } from "ethers/lib/utils";

import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { IERC20__factory, TenXBank, TestERC20 } from "../typechain-types";

describe("TenXBank", function () {
  let tenXBank: TenXBank;
  let tenXToken: TestERC20;
  let bankOwner: SignerWithAddress;
  let claimer: SignerWithAddress;
  let wallet1: SignerWithAddress;
  let wallet2: SignerWithAddress;
  let wallet3: SignerWithAddress;
  let wallet4: SignerWithAddress;

  before(async () => {
    const signers = await ethers.getSigners();
    bankOwner = signers[0];
    claimer = signers[0];
    wallet1 = signers[1];
    wallet2 = signers[2];
    wallet3 = signers[3];
    wallet4 = signers[4];

    const TenXBank = await ethers.getContractFactory("TenXBank");
    tenXBank = await TenXBank.deploy(bankOwner.address, claimer.address);

    const TenXToken = await ethers.getContractFactory("TestERC20");
    tenXToken = await TenXToken.deploy("SCB10XBankTOken", "10XBT");

    const mintAmount = parseEther("100");

    await tenXToken.mint(wallet1.address, mintAmount);
  });

  describe("TenX Bank Contract", async () => {
    it("Should be able to create an account", async () => {
      const accountName1 = "Mike";
      const accountName2 = "Gaga";
      const accountName3 = "Tom";
      const accountName4 = "Jerry";
      await expect(tenXBank.connect(wallet1).createAccount(accountName1)).to.not
        .reverted;
      await expect(tenXBank.connect(wallet2).createAccount(accountName2)).to.not
        .reverted;
      await expect(tenXBank.connect(wallet3).createAccount(accountName3)).to.not
        .reverted;
      await expect(tenXBank.connect(wallet4).createAccount(accountName4)).to.not
        .reverted;
    });

    it("Should not be able to create an account", async () => {
      const accountName1 = "Mike";
      await expect(tenXBank.createAccount(accountName1)).to.be.reverted;
      const numberOfAccount = await tenXBank.connect(wallet1).numberOfAccount();
      await expect(numberOfAccount).to.be.equal(1);
    });

    it("Should be token 100 token in the wallet 1 ", async () => {
      const result = await tenXToken.balanceOf(wallet1.address);
      expect(result).to.equal(parseEther("100"));
    });

    it("Should deposit into tenXBank contract", async () => {
      await tenXToken
        .connect(wallet1)
        .approve(tenXBank.address, parseEther("100000"));

      await tenXBank
        .connect(wallet1)
        .deposit(tenXToken.address, "Mike", parseEther("100"));

      const balanceTokenWallet1 = await tenXToken.balanceOf(wallet1.address);
      expect(balanceTokenWallet1).to.be.equal(parseEther("0"));

      const balanceOfWallet1 = await tenXBank.tokenAccountBalanceOf(
        tenXToken.address,
        "Mike"
      );
      expect(balanceOfWallet1).to.be.equal(parseEther("100"));
    });

    it("Should withdraw token from tenXBank contract", async () => {
      await tenXBank
        .connect(wallet1)
        .withdraw(tenXToken.address, "Mike", parseEther("60"));

      const balanceTokenWallet1 = await tenXToken.balanceOf(wallet1.address);
      expect(balanceTokenWallet1).to.be.equal(parseEther("60"));

      const balanceOfWallet1 = await tenXBank.tokenAccountBalanceOf(
        tenXToken.address,
        "Mike"
      );
      expect(balanceOfWallet1).to.be.equal(parseEther("40"));
    });

    it("Should bank transfer from wallet1 to wallet2", async () => {
      const balanceOfWallet2 = await tenXBank.tokenAccountBalanceOf(
        tenXToken.address,
        "Gaga"
      );
      expect(balanceOfWallet2).to.be.equal(parseEther("0"));

      await tenXBank
        .connect(wallet1)
        .bankTransfer(tenXToken.address, "Mike", "Gaga", parseEther("40"));
    });

    it("Wallet 2 should be receive token ", async () => {
      const balanceOfWallet1 = await tenXBank.tokenAccountBalanceOf(
        tenXToken.address,
        "Mike"
      );
      const balanceOfWallet2AfterTransfer =
        await tenXBank.tokenAccountBalanceOf(tenXToken.address, "Gaga");

      expect(balanceOfWallet1).to.be.equal(parseEther("0"));
      expect(balanceOfWallet2AfterTransfer).to.be.equal(parseEther("39.6"));

      const erc20Wallet1 = await tenXToken.balanceOf(wallet1.address);
      const erc20Wallet2 = await tenXToken.balanceOf(wallet2.address);
      expect(erc20Wallet1).to.be.equal(parseEther("60"));
      expect(erc20Wallet2).to.be.equal(parseEther("0"));

      const totalMike = await tenXBank.nameBalanceOf("Mike");
      const totalGaga = await tenXBank.nameBalanceOf("Gaga");
      expect(totalMike).to.be.equal(parseEther("0"));
      expect(totalGaga).to.be.equal(parseEther("39.6"));
    });

    it("Batch transfer", async () => {
      const tokens = [tenXToken.address, tenXToken.address];
      const sendersName = ["Gaga", "Gaga"];
      const recipientsName = ["Tom", "Jerry"];
      const amounts = [parseEther("2"), parseEther("10")];

      const totalGaga = await tenXBank.nameBalanceOf("Gaga");
      expect(totalGaga).to.be.equal(parseEther("39.6"));

      await tenXBank
        .connect(wallet2)
        .batchBankTransfer(tokens, sendersName, recipientsName, amounts);

      const totalTom = await tenXBank.nameBalanceOf("Tom");
      const totalJerry = await tenXBank.nameBalanceOf("Jerry");
      expect(totalTom).to.be.equal(parseEther("1.98"));
      expect(totalJerry).to.be.equal(parseEther("9.9"));
    });
  });
});
