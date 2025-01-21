// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import "openzeppelin-contracts/access/Ownable.sol";
import "openzeppelin-contracts/token/ERC20/IERC20.sol";
import "openzeppelin-contracts/token/ERC20/utils/SafeERC20.sol";

contract TipJar is Ownable {
    using SafeERC20 for IERC20;

    event Payment(address indexed sender, uint256 amount);
    event Withdraw(address indexed recipient, uint256 amount);
    event WithdrawERC20(
        address indexed recipient,
        address indexed token,
        uint256 amount
    );

    receive() external payable {
        emit Payment(msg.sender, msg.value);
    }

    function deposit() external payable {
        require(msg.value > 0, "Deposit amount must be greater than zero");
        emit Payment(msg.sender, msg.value);
    }

    function withdraw() external onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No ETH to withdraw");

        (bool sent, ) = msg.sender.call{value: balance}("");
        require(sent, "Failed to send ETH");

        emit Withdraw(msg.sender, balance);
    }

    function transferEth(address _to, uint256 _amount) external onlyOwner {
        require(_amount > 0, "Transfer amount must be greater than zero");
        require(_amount <= address(this).balance, "Insufficient ETH balance");

        (bool sent, ) = _to.call{value: _amount}("");
        require(sent, "Failed to send ETH");

        emit Withdraw(_to, _amount);
    }

    function transferERC20(
        address _token,
        address _to,
        uint256 _amount
    ) external onlyOwner {
        require(_amount > 0, "Transfer amount must be greater than zero");
        require(
            IERC20(_token).balanceOf(address(this)) >= _amount,
            "Insufficient token balance"
        );

        IERC20(_token).safeTransfer(_to, _amount);

        emit WithdrawERC20(_to, _token, _amount);
    }

    function getBalance() external view returns (uint256) {
        return address(this).balance;
    }

    function getTokenBalance(address _token) external view returns (uint256) {
        return IERC20(_token).balanceOf(address(this));
    }
}
