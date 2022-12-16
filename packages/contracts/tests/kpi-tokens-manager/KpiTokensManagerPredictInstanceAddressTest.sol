pragma solidity 0.8.17;

import {BaseTestSetup} from "../commons/BaseTestSetup.sol";
import {KPITokensManager1} from "../../src/kpi-tokens-managers/KPITokensManager1.sol";
import {Clones} from "oz/proxy/Clones.sol";

/// SPDX-License-Identifier: GPL-3.0-or-later
/// @title KPI tokens manager predict instance address test
/// @dev Tests template instance address prediction in KPI tokens manager.
/// @author Federico Luzzi - <federico.luzzi@protonmail.com>
contract KpiTokensManagerPredictInstanceAddressTest is BaseTestSetup {
    function testSuccess() external {
        bytes memory _initializationData = abi.encodePacked(uint256(1), uint256(2), uint256(3));
        bytes memory _oraclesInitializationData = abi.encodePacked(uint256(4), uint256(5), uint256(6));
        string memory _description = "a";
        address _predictedAddress = Clones.predictDeterministicAddress(
            address(mockKpiTokenTemplate),
            keccak256(
                abi.encodePacked(
                    address(this),
                    uint256(1),
                    _description,
                    block.timestamp + 60,
                    _initializationData,
                    _oraclesInitializationData
                )
            ),
            address(kpiTokensManager)
        );
        assertEq(
            _predictedAddress,
            kpiTokensManager.predictInstanceAddress(
                address(this), 1, _description, block.timestamp + 60, _initializationData, _oraclesInitializationData
            )
        );
    }
}
