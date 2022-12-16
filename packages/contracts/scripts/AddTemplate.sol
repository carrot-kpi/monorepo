pragma solidity 0.8.17;

import {IBaseTemplatesManager} from "../src/interfaces/IBaseTemplatesManager.sol";
import {Script} from "forge-std/Script.sol";
import {console2} from "forge-std/console2.sol";

/// SPDX-License-Identifier: GPL-3.0-or-later
/// @title Add template
/// @dev Adds a template on a target network.
/// @author Federico Luzzi - <federico.luzzi@protonmail.com>
contract AddTemplate is Script {
    error ZeroAddress();
    error InvalidSpecification();

    function run(address _templatesManager, address _template, string calldata _specification) external {
        if (_templatesManager == address(0)) revert ZeroAddress();
        if (_template == address(0)) revert ZeroAddress();
        if (bytes(_specification).length == 0) revert InvalidSpecification();

        vm.startBroadcast();
        IBaseTemplatesManager(_templatesManager).addTemplate(_template, _specification);
        vm.stopBroadcast();
    }
}
