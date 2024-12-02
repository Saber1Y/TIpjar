// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.17;

contract Tipjar {
    uint256 public Owner;

    error AmountLessThanZero();
    error NoRecipentAddress();

    function SendTip(address _recipient) external payable {
        if (msg.value < 0) {
            revert AmountLessThanZero();
        }
        if (address _recipient == address[0]) {
            revert NoRecipentAddress();
        }
    }
}