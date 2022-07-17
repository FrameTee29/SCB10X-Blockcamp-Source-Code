// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "./abstracts/FeeCollector.sol";

contract TenXBank is FeeCollector {
    using SafeMath for uint256;

    event CreateAccount(address wallet, string name);
    event Deposit(
        address token,
        address depositor,
        string name,
        uint256 amount
    );
    event Withdraw(
        address token,
        address withdrawal,
        string name,
        uint256 amount
    );
    event BankTransfer(
        address token,
        address from,
        string fromName,
        address to,
        string toName,
        uint256 amount,
        uint256 netPrice,
        uint256 fee
    );

    address public owner;

    mapping(address => string[]) public account;
    mapping(string => address) private _nameAccount;

    mapping(string => uint256) private _nameBalanceOf;
    mapping(address => mapping(string => uint256))
        private _tokenAccountBalanceOf;

    modifier OnlyUniqueName(string memory name) {
        require(checkUniqueName(name) == address(0), "Must be unique name");
        _;
    }

    constructor(address owner_, address claimer) FeeCollector(claimer) {
        owner = owner_;
    }

    function setClaimer(address newClaimer) external {
        _setClaimer(newClaimer);
    }

    function setFee(uint256 percentage) external {
        require(
            percentage >= 0 && percentage <= 100,
            "Must be in the range 0-100"
        );
        _setFeePercentage(percentage);
    }

    function getAllMyAccount() external view returns (string[] memory) {
        return account[msg.sender];
    }

    function numberOfAccount() external view returns (uint256) {
        return account[msg.sender].length;
    }

    function nameAccount(string memory name) external view returns (address) {
        return _nameAccount[name];
    }

    function nameBalanceOf(string memory name) external view returns (uint256) {
        return _nameBalanceOf[name];
    }

    function tokenAccountBalanceOf(address token, string memory name)
        external
        view
        returns (uint256)
    {
        return _tokenAccountBalanceOf[token][name];
    }

    function createAccount(string memory name) external OnlyUniqueName(name) {
        account[msg.sender].push(name);
        _nameAccount[name] = msg.sender;
        _nameBalanceOf[name] = 0;

        emit CreateAccount(msg.sender, name);
    }

    function deposit(
        address token,
        string memory name,
        uint256 amount
    ) external {
        require(
            checkUniqueName(name) != address(0),
            "This account name does not exist"
        );

        IERC20(token).transferFrom(msg.sender, address(this), amount);
        _nameBalanceOf[name] += amount;
        _tokenAccountBalanceOf[token][name] += amount;

        emit Deposit(token, msg.sender, name, amount);
    }

    function withdraw(
        address token,
        string memory name,
        uint256 amount
    ) external {
        require(
            checkUniqueName(name) != address(0),
            "This account name does not exist"
        );
        uint256 balance = _tokenAccountBalanceOf[token][name];
        uint256 withdrawAmount = amount >= balance ? balance : amount;
        IERC20(token).transfer(msg.sender, withdrawAmount);
        _nameBalanceOf[name] -= withdrawAmount;
        _tokenAccountBalanceOf[token][name] -= withdrawAmount;

        emit Deposit(token, msg.sender, name, amount);
    }

    function batchBankTransfer(
        address[] calldata tokens,
        string[] memory sendersName,
        string[] memory recipientsName,
        uint256[] calldata amounts
    ) external {
        require(tokens.length == amounts.length, "Invalid input parameters");

        for (uint256 index = 0; index < tokens.length; index++) {
            bankTransfer(
                tokens[index],
                sendersName[index],
                recipientsName[index],
                amounts[index]
            );
        }
    }

    function bankTransfer(
        address token,
        string memory senderName,
        string memory recipientName,
        uint256 amount
    ) public {
        require(
            checkUniqueName(senderName) != address(0),
            "This account name does not exist"
        );
        require(
            checkUniqueName(recipientName) != address(0),
            "This account name does not exist"
        );
        address sender = _nameAccount[senderName];
        address recipient = _nameAccount[recipientName];

        uint256 balanceOfSender = _tokenAccountBalanceOf[token][senderName];
        require(amount <= balanceOfSender, "Transfer amount exceeds balance");
        uint256 netPrice = amount;
        uint256 collected = 0;

        if (msg.sender != recipient) {
            (netPrice, collected) = deductFee(token, amount);
        }

        _bankTransfer(token, senderName, recipientName, amount, netPrice);

        emit BankTransfer(
            token,
            sender,
            senderName,
            recipient,
            recipientName,
            amount,
            netPrice,
            collected
        );
    }

    function checkUniqueName(string memory name)
        internal
        view
        returns (address)
    {
        return _nameAccount[name];
    }

    function _bankTransfer(
        address token,
        string memory senderName,
        string memory recipientName,
        uint256 amount,
        uint256 netPrice
    ) internal {
        _nameBalanceOf[senderName] -= amount;
        _tokenAccountBalanceOf[token][senderName] -= amount;

        _nameBalanceOf[recipientName] += netPrice;
        _tokenAccountBalanceOf[token][recipientName] += netPrice;
    }
}
