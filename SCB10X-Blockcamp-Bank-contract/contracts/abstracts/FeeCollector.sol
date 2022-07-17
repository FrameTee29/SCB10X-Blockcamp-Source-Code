// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

abstract contract FeeCollector {
    using SafeMath for uint256;

    uint256 public feePercentage = 1;

    address public claimer;

    mapping(address => uint256) private _tokenFee;

    modifier onlyClaimer() {
        require(msg.sender == claimer, "Must be claimer");
        _;
    }

    constructor(address claimer_) {
        claimer = claimer_;
    }

    function tokenFee(address token)
        external
        view
        onlyClaimer
        returns (uint256)
    {
        return _tokenFee[token];
    }

    function calculateFee(uint256 amount) internal view returns (uint256) {
        return amount.div(100).mul(feePercentage);
    }

    function deductFee(address token, uint256 amount)
        internal
        returns (uint256, uint256)
    {
        uint256 collected = calculateFee(amount);
        uint256 netPrice = amount - collected;
        _tokenFee[token] += collected;
        return (netPrice, collected);
    }

    function collectFees(
        address token,
        uint256 amount,
        address recipient
    ) external {
        uint256 withDrawFeeAmount = amount >= _tokenFee[token]
            ? _tokenFee[token]
            : amount;

        _tokenFee[token] -= withDrawFeeAmount;
        IERC20(token).transfer(recipient, withDrawFeeAmount);
    }

    function _setClaimer(address newClaimer) internal {
        claimer = newClaimer;
        // TODO: event change claimer
    }

    function _setFeePercentage(uint256 newFee) internal {
        feePercentage = newFee;
    }
}
