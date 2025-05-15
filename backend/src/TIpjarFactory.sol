// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "./Tipjar.sol";

contract TipJarFactory {
    error SlugAlreadyExists(string slug);
    error InvalidSlug();
    error InvalidCID();

    event TipJarCreated(
        address indexed owner,
        address tipJar,
        string slug,
        string cid
    );
    event TipJarMetadataUpdated(
        string indexed slug,
        string oldCid,
        string newCid
    );

    mapping(string => address) public slugsToTipJar;
    mapping(address => string) public tipJarToSlug;
    mapping(string => string) public slugToCID;
    mapping(address => address[]) public ownerTipJars;

    address[] public allTipJars;

    // Check if slug is valid (not empty and doesn't contain invalid characters)
    modifier validSlug(string memory slug) {
        bytes memory slugBytes = bytes(slug);
        if (slugBytes.length == 0) revert InvalidSlug();

        // Basic slug validation - could be more comprehensive if needed
        for (uint i = 0; i < slugBytes.length; i++) {
            bytes1 char = slugBytes[i];
            bool validChar = (char >= 0x30 && char <= 0x39) || // 0-9
                (char >= 0x61 && char <= 0x7A) || // a-z
                (char == 0x2D); // hyphen

            if (!validChar) revert InvalidSlug();
        }
        _;
    }

    // Check if CID is valid (not empty)
    modifier validCID(string memory cid) {
        if (bytes(cid).length == 0) revert InvalidCID();
        _;
    }

    function createTipJar(
        string memory slug,
        string memory cid
    ) external validSlug(slug) validCID(cid) returns (address) {
        if (slugsToTipJar[slug] != address(0)) {
            revert SlugAlreadyExists(slug);
        }

        TipJar tipJar = new TipJar(msg.sender);
        address tipJarAddress = address(tipJar);

        // Store all relevant mappings
        allTipJars.push(tipJarAddress);
        slugsToTipJar[slug] = tipJarAddress;
        tipJarToSlug[tipJarAddress] = slug;
        slugToCID[slug] = cid;

        // Track tipjars by owner
        ownerTipJars[msg.sender].push(tipJarAddress);

        emit TipJarCreated(msg.sender, tipJarAddress, slug, cid);
        return tipJarAddress;
    }

    function updateTipJarMetadata(
        string memory slug,
        string memory newCid
    ) external validCID(newCid) returns (bool) {
        address tipJarAddress = slugsToTipJar[slug];
        require(tipJarAddress != address(0), "TipJar not found");

        TipJar tipJar = TipJar(payable(tipJarAddress));
        require(tipJar.owner() == msg.sender, "Not the owner");

        string memory oldCid = slugToCID[slug];
        slugToCID[slug] = newCid;

        emit TipJarMetadataUpdated(slug, oldCid, newCid);
        return true;
    }

    function getAllTipJars() external view returns (address[] memory) {
        return allTipJars;
    }

    function getTipJarBySlug(
        string memory slug
    ) external view returns (address) {
        return slugsToTipJar[slug];
    }

    function getCIDBySlug(
        string memory slug
    ) external view returns (string memory) {
        return slugToCID[slug];
    }

    function getCIDByAddress(
        address tipJar
    ) external view returns (string memory) {
        return slugToCID[tipJarToSlug[tipJar]];
    }

    function getTipJarsByOwner(
        address owner
    ) external view returns (address[] memory) {
        return ownerTipJars[owner];
    }
}
