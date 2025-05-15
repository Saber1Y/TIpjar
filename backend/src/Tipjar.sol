// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/**
 * @title TipJar
 * @dev Contract for receiving tips in ETH, with support for withdrawals
 */

contract TipJar is Ownable, ReentrancyGuard {
    // Events
    event TipReceived(address indexed from, uint256 amount, uint256 timestamp);
    event Withdrawn(address indexed to, uint256 amount, uint256 timestamp);

    // Tip structure
    struct Tip {
        address sender;
        uint256 amount;
        uint256 timestamp;
    }

    // State variables
    Tip[] public tips;
    uint256 public totalTips;

    // Constructor
    constructor(address initialOwner) Ownable(initialOwner) {
        // Set the creator as the owner
    }

    /**
     * @dev Fallback function to receive tips
     */
    receive() external payable {
        _recordTip();
    }

    /**
     * @dev Function to send a tip
     */
    function tip() external payable {
        require(msg.value > 0, "Tip amount must be greater than 0");
        _recordTip();
    }

    /**
     * @dev Internal function to record tips with metadata
     */
    function _recordTip() private {
        // Record the tip
        tips.push(
            Tip({
                sender: msg.sender,
                amount: msg.value,
                timestamp: block.timestamp
            })
        );

        // Update total tips received
        totalTips += msg.value;

        // Emit event
        emit TipReceived(msg.sender, msg.value, block.timestamp);
    }

    /**
     * @dev Allows the owner to withdraw funds
     * @param amount The amount to withdraw
     */
    function withdraw(uint256 amount) external onlyOwner nonReentrant {
        require(amount > 0, "Amount must be greater than 0");
        require(amount <= address(this).balance, "Insufficient balance");

        // Transfer the specified amount to the owner
        (bool success, ) = payable(owner()).call{value: amount}("");
        require(success, "Withdrawal failed");

        // Emit withdrawal event
        emit Withdrawn(owner(), amount, block.timestamp);
    }

    /**
     * @dev Allows the owner to withdraw all funds
     */
    function withdrawAll() external onlyOwner nonReentrant {
        uint256 balance = address(this).balance;
        require(balance > 0, "No funds to withdraw");

        // Transfer all funds to the owner
        (bool success, ) = payable(owner()).call{value: balance}("");
        require(success, "Withdrawal failed");

        // Emit withdrawal event
        emit Withdrawn(owner(), balance, block.timestamp);
    }

    /**
     * @dev Get total number of tips received
     * @return The number of tips received
     */
    function getTipCount() external view returns (uint256) {
        return tips.length;
    }

    /**
     * @dev Get the balance of the TipJar
     * @return The current balance in wei
     */
    function getBalance() external view returns (uint256) {
        return address(this).balance;
    }

    /**
     * @dev Get recent tips
     * @param limit Maximum number of tips to return
     * @return Array of recent tips
     */
    function getRecentTips(uint256 limit) external view returns (Tip[] memory) {
        uint256 count = tips.length;

        // If limit is greater than count, use count
        if (limit > count) {
            limit = count;
        }

        // Create an array to store the recent tips
        Tip[] memory recentTips = new Tip[](limit);

        // Populate the array with the most recent tips
        for (uint256 i = 0; i < limit; i++) {
            recentTips[i] = tips[count - 1 - i];
        }

        return recentTips;
    }
}
