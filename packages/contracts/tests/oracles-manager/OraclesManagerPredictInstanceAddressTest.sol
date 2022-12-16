pragma solidity 0.8.17;

import {BaseTestSetup} from "../commons/BaseTestSetup.sol";
import {OraclesManager1} from "../../src/oracles-managers/OraclesManager1.sol";
import {Clones} from "oz/proxy/Clones.sol";

/// SPDX-License-Identifier: GPL-3.0-or-later
/// @title Oracles manager predict template instance address test
/// @dev Tests template instance address prediction in oracles manager.
/// @author Federico Luzzi - <federico.luzzi@protonmail.com>
contract OraclesManagerPredictInstanceAddressTest is BaseTestSetup {
    function testSuccess() external {
        bytes memory _initializationData = abi.encodePacked(uint256(1), uint256(2), uint256(3));
        address _predicatedAddress = Clones.predictDeterministicAddress(
            address(mockOracleTemplate),
            keccak256(abi.encodePacked(address(this), uint256(1), _initializationData)),
            address(oraclesManager)
        );
        assertEq(_predicatedAddress, oraclesManager.predictInstanceAddress(address(this), 1, _initializationData));
    }
}
