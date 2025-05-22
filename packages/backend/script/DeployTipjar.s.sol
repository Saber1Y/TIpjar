pragma solidity ^0.8.24;

import {TipJar} from "../src/Tipjar.sol";
import {Script} from "forge-std/Script.sol";
import {console} from "forge-std/console.sol";
import {Strings} from "@openzeppelin/contracts/utils/Strings.sol";

contract DeployTipjar is Script {
    function run() external {
        vm.startBroadcast();

        TipJar tipJar = new TipJar(msg.sender);

        vm.stopBroadcast();

        console.log("TipJar deployed at:", address(tipJar));

        // Generate JSON file with contract address
        string memory root = vm.projectRoot();
        string memory path = string.concat(root, "/out/contract.json");
        console.log("Writing contract address to:", path);
        string memory json = string(
            abi.encodePacked(
                '{"address":"',
                Strings.toHexString(uint160(address(tipJar)), 20),
                '","network":"',
                Strings.toString(block.chainid),
                '"}'
            )
        );

        vm.writeJson(json, path);
    }
}
