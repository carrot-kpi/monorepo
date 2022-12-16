pragma solidity 0.8.17;

import {BaseTestSetup} from "../commons/BaseTestSetup.sol";
import {OraclesManager1} from "../../src/oracles-managers/OraclesManager1.sol";
import {Clones} from "oz/proxy/Clones.sol";

/// SPDX-License-Identifier: GPL-3.0-or-later
/// @title Oracles manager instantiate template test
/// @dev Tests template instantiation in oracles manager.
/// @author Federico Luzzi - <federico.luzzi@protonmail.com>
contract OraclesManagerInstantiateTest is BaseTestSetup {
    function testNotFromCreatedKpiTokenFail() external {
        vm.expectRevert(abi.encodeWithSignature("Forbidden()"));
        oraclesManager.instantiate(address(this), 0, bytes(""));
    }

    function testSuccessMockOracle() external {
        bytes memory _initializationData = abi.encode("asdf");
        address _predictedInstanceAddress = Clones.predictDeterministicAddress(
            address(mockOracleTemplate),
            keccak256(abi.encodePacked(address(this), uint256(1), _initializationData)),
            address(oraclesManager)
        );
        vm.mockCall(
            address(factory), abi.encodeWithSignature("allowOraclesCreation(address)", address(this)), abi.encode(true)
        );
        address _instance = oraclesManager.instantiate(address(this), 1, _initializationData);
        assertEq(_instance, _predictedInstanceAddress);
        vm.clearMockedCalls();
    }
}
