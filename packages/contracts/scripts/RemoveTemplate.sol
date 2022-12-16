pragma solidity 0.8.17;

import {IBaseTemplatesManager} from "../src/interfaces/IBaseTemplatesManager.sol";
import {Script} from "forge-std/Script.sol";
import {console2} from "forge-std/console2.sol";

/// SPDX-License-Identifier: GPL-3.0-or-later
/// @title Remove template
/// @dev Removes a template on a target network.
/// @author Federico Luzzi - <federico.luzzi@protonmail.com>
contract RemoveTemplate is Script {
    error ZeroAddress();
    error InvalidId();

    function run(address _templatesManager, uint256 _templateId) external {
        if (_templatesManager == address(0)) revert ZeroAddress();
        if (_templateId == 0) revert InvalidId();

        vm.startBroadcast();
        IBaseTemplatesManager(_templatesManager).removeTemplate(_templateId);
        vm.stopBroadcast();
    }
}
