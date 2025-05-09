// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import "./Tipjar.sol";

contract TipJarFactory {
    error SlugAlreadyExists(string slug);

    event TipJarCreated(address indexed owner, address tipJar, string slug);

    mapping(string => address) public slugsToTipJar;
    mapping(address => string) public tipJarToSlug;

    address[] public allTipJars;

    function createTipJar(string memory slug) external returns (address) {
        if (slugsToTipJar[slug] != address(0)) {
            revert SlugAlreadyExists(slug);
        }

        TipJar tipJar = new TipJar(msg.sender);
        address tipJarAddress = address(tipJar);

        allTipJars.push(tipJarAddress);
        slugsToTipJar[slug] = tipJarAddress;
        tipJarToSlug[tipJarAddress] = slug;

        emit TipJarCreated(msg.sender, tipJarAddress, slug);
        return tipJarAddress;
    }

    function getAllTipJars() external view returns (address[] memory) {
        return allTipJars;
    }

    function getTipJarBySlug(
        string memory slug
    ) external view returns (address) {
        return slugsToTipJar[slug];
    }
}
