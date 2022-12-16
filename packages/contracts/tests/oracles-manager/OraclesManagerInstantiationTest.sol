pragma solidity 0.8.17;

import {BaseTestSetup} from "../commons/BaseTestSetup.sol";
import {OraclesManager1} from "../../src/oracles-managers/OraclesManager1.sol";

/// SPDX-License-Identifier: GPL-3.0-or-later
/// @title Oracles manager instantiation test
/// @dev Tests instantiation in oracles manager.
/// @author Federico Luzzi - <federico.luzzi@protonmail.com>
contract OraclesManagerInstantiationTest is BaseTestSetup {
    function testZeroAddressFactory() external {
        vm.expectRevert(abi.encodeWithSignature("ZeroAddressFactory()"));
        oraclesManager = new OraclesManager1(address(0));
    }
}
