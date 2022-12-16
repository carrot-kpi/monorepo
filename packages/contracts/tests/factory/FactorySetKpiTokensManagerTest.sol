pragma solidity 0.8.17;

import {BaseTestSetup} from "../commons/BaseTestSetup.sol";

/// SPDX-License-Identifier: GPL-3.0-or-later
/// @title Factory set KPI tokens manager test
/// @dev Tests factory setter for the KPI tokens manager.
/// @author Federico Luzzi - <federico.luzzi@protonmail.com>
contract FactorySetKpiTokensManagerTest is BaseTestSetup {
    function testNonOwner() external {
        vm.prank(address(1));
        vm.expectRevert("Ownable: caller is not the owner");
        factory.setKpiTokensManager(address(2));
    }

    function testZeroAddressManager() external {
        vm.expectRevert(abi.encodeWithSignature("ZeroAddressKpiTokensManager()"));
        factory.setKpiTokensManager(address(0));
    }

    function testSuccess() external {
        assertEq(factory.kpiTokensManager(), address(kpiTokensManager));
        address _newKpiTokensManager = address(2);
        factory.setKpiTokensManager(_newKpiTokensManager);
        assertEq(factory.kpiTokensManager(), _newKpiTokensManager);
    }
}
