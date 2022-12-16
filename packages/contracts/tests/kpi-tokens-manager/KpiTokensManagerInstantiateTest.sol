pragma solidity 0.8.17;

import {BaseTestSetup} from "../commons/BaseTestSetup.sol";
import {OraclesManager1} from "../../src/oracles-managers/OraclesManager1.sol";
import {Clones} from "oz/proxy/Clones.sol";
import {OracleData} from "../mocks/MockKPIToken.sol";

/// SPDX-License-Identifier: GPL-3.0-or-later
/// @title KPI tokens manager instantiation test
/// @dev Tests template instantiation in KPI tokens manager.
/// @author Federico Luzzi - <federico.luzzi@protonmail.com>
contract KpiTokensManagerInstantiateTest is BaseTestSetup {
    function testNotFromFactoryFail() external {
        vm.expectRevert(abi.encodeWithSignature("Forbidden()"));
        kpiTokensManager.instantiate(address(this), 1, "a", block.timestamp + 60, abi.encode(""), abi.encode(""));
    }

    function testSuccessMock() external {
        OracleData[] memory _oracles = new OracleData[](1);
        _oracles[0] = OracleData({templateId: 1, data: abi.encode("")});

        string memory _description = "a";

        vm.prank(address(factory));
        address _predictedInstanceAddress = kpiTokensManager.predictInstanceAddress(
            address(this), 1, _description, block.timestamp + 60, abi.encode(""), abi.encode(_oracles)
        );

        vm.mockCall(
            address(factory),
            abi.encodeWithSignature("allowOraclesCreation(address)", _predictedInstanceAddress),
            abi.encode(true)
        );

        vm.prank(address(factory));
        (address _instance,) = kpiTokensManager.instantiate(
            address(this), 1, _description, block.timestamp + 60, abi.encode(""), abi.encode(_oracles)
        );

        assertEq(_instance, _predictedInstanceAddress);
        vm.clearMockedCalls();
    }
}
