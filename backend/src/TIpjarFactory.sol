// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import "./Tipjar.sol";

contract TipJarFactory {
    event TipJarCreated(address indexed owner, address tipJar);

    address[] public allTipJars;

    function createTipJar() external returns (address) {
        TipJar tipJar = new TipJar(msg.sender);
        allTipJars.push(address(tipJar));

        emit TipJarCreated(msg.sender, address(tipJar));
        return address(tipJar);
    }

    function getAllTipJars() external view returns (address[] memory) {
        return allTipJars;
    }
}
