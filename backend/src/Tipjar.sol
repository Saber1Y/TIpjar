// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.17;

contract TipJar {
    address public owner;

    error NoRecipientAddress();
    error NoFundsToWithdraw();

    modifier onlyOwner() {
        require(msg.sender == owner, "Not the contract owner");
        _;
    }

    constructor() {
        owner = msg.sender; // Set the contract deployer as the owner
    }

    function sendTip(address _recipient) external payable {
        if (_recipient == address(0)) {
            revert NoRecipientAddress();
        }

        (bool success, ) = payable(_recipient).call{value: msg.value}("");
        require(success, "Transaction failed");
    }

    function withdraw() external onlyOwner {
        uint256 balance = address(this).balance;
        if (balance == 0) {
            revert NoFundsToWithdraw();
        }

        (bool sent, ) = payable(msg.sender).call{value: balance}("");
        require(sent, "Failed to send Ether");
    }
}
