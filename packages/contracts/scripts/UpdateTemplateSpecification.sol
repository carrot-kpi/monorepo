pragma solidity 0.8.17;

import {IBaseTemplatesManager} from "../src/interfaces/IBaseTemplatesManager.sol";
import {Script} from "forge-std/Script.sol";
import {console2} from "forge-std/console2.sol";

/// SPDX-License-Identifier: GPL-3.0-or-later
/// @title Update template specification.
/// @dev Updates a template specification on a target network.
/// @author Federico Luzzi - <federico.luzzi@protonmail.com>
contract UpdateTemplateSpecification is Script {
    error ZeroAddress();
    error ZeroId();
    error InvalidSpecification();

    function run(address _templatesManager, uint256 _templateId, string calldata _specification) external {
        if (_templatesManager == address(0)) revert ZeroAddress();
        if (_templateId == 0) revert ZeroId();
        if (bytes(_specification).length == 0) revert InvalidSpecification();

        vm.startBroadcast();
        IBaseTemplatesManager(_templatesManager).updateTemplateSpecification(_templateId, _specification);
        vm.stopBroadcast();
    }
}
