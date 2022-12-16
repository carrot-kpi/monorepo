pragma solidity 0.8.17;

import {BaseTestSetup} from "../commons/BaseTestSetup.sol";

/// SPDX-License-Identifier: GPL-3.0-or-later
/// @title Factory set oracles manager test
/// @dev Tests factory setter for oracles manager.
/// @author Federico Luzzi - <federico.luzzi@protonmail.com>
contract FactorySetOraclesManagerTest is BaseTestSetup {
    function testNonOwner() external {
        vm.prank(address(1));
        vm.expectRevert("Ownable: caller is not the owner");
        factory.setOraclesManager(address(2));
    }

    function testZeroAddressManager() external {
        vm.expectRevert(abi.encodeWithSignature("ZeroAddressOraclesManager()"));
        factory.setOraclesManager(address(0));
    }

    function testSuccess() external {
        assertEq(factory.oraclesManager(), address(oraclesManager));
        address _newOraclesManager = address(2);
        factory.setOraclesManager(_newOraclesManager);
        assertEq(factory.oraclesManager(), _newOraclesManager);
    }
}
