pragma solidity ^0.8.24;

import {TipJar} from "../src/Tipjar.sol";
import {Script} from "forge-std/Script.sol";
import {console} from "forge-std/console.sol";

contract DeployTipjar is Script {
    function run() external {
        vm.startBroadcast();

        TipJar tipJar = new TipJar(msg.sender);

        vm.stopBroadcast();

        console.log("TipJar deployed at:", address(tipJar));
    }
}
