// SPDX-License-Identifier: MIT 
pragma solidity ^0.8.30;

import {TipJarFactory} from "../src/TIpjarFactory.sol";
import {Script} from "forge-std/Script.sol";
import {console} from "forge-std/console.sol";

contract DeployTipjarFactory is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        
        vm.startBroadcast(deployerPrivateKey);

        // Deploy TipJarFactory
        TipJarFactory factory = new TipJarFactory();

        vm.stopBroadcast();

        console.log("=== TipJar Factory Deployment ===");
        console.log("Network Chain ID:", block.chainid);
        console.log("Factory deployed at:", address(factory));
        console.log("Deployer address:", vm.addr(deployerPrivateKey));
        
        // Save deployment info
        _saveDeploymentInfo(address(factory), block.chainid);
    }
    
    function _saveDeploymentInfo(address factoryAddress, uint256 chainId) internal {
        string memory networkName = chainId == 8453 ? "base-mainnet" : "unknown";
        
        string memory json = string(
            abi.encodePacked(
                '{"factory_address":"',
                _addressToString(factoryAddress),
                '","chain_id":',
                _uintToString(chainId),
                ',"network":"',
                networkName,
                '","timestamp":',
                _uintToString(block.timestamp),
                '}'
            )
        );
        
        string memory filename = string.concat("deployment-", networkName, ".json");
        vm.writeJson(json, string.concat("./deployments/", filename));
        
        console.log("Deployment info saved to:", filename);
    }
    
    function _addressToString(address addr) internal pure returns (string memory) {
        bytes32 value = bytes32(uint256(uint160(addr)));
        bytes memory alphabet = "0123456789abcdef";
        bytes memory str = new bytes(42);
        str[0] = '0';
        str[1] = 'x';
        for (uint i = 0; i < 20; i++) {
            str[2+i*2] = alphabet[uint8(value[i + 12] >> 4)];
            str[3+i*2] = alphabet[uint8(value[i + 12] & 0x0f)];
        }
        return string(str);
    }
    
    function _uintToString(uint256 value) internal pure returns (string memory) {
        if (value == 0) return "0";
        uint256 temp = value;
        uint256 digits;
        while (temp != 0) {
            digits++;
            temp /= 10;
        }
        bytes memory buffer = new bytes(digits);
        while (value != 0) {
            digits -= 1;
            buffer[digits] = bytes1(uint8(48 + uint256(value % 10)));
            value /= 10;
        }
        return string(buffer);
    }
}
