// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.17;
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v4.9.0/contracts/access/Ownable.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v4.9.0/contracts/token/ERC20/IERC20.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v4.9.0/contracts/token/ERC20/utils/SafeERC20.sol";

contract TipJar {
    address public owner; //iniialise owner variable

    error NoRecipientAddress(); //fall back error message
    error NoFundsToWithdraw(); //fall back error message
    error NotContractOwner()

    modifier onlyOwner() {
        if (msg.sender != owner) {
            revert NotContractOwner(); //revert error message
        }
        _;
    } //condiition to check owner variable

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
