pragma solidity 0.8.17;

import {BaseTestSetup} from "../commons/BaseTestSetup.sol";
import {TokenAmount} from "../../src/commons/Types.sol";
import {OracleData} from "../mocks/MockKPIToken.sol";

/// SPDX-License-Identifier: GPL-3.0-or-later
/// @title Factory create token test
/// @dev Tests KPI token creation.
/// @author Federico Luzzi - <federico.luzzi@protonmail.com>
contract FactoryCreateTokenTest is BaseTestSetup {
    function testInvalidTemplateId() external {
        vm.expectRevert(abi.encodeWithSignature("NonExistentTemplate()"));
        factory.createToken(10, "a", block.timestamp + 60, abi.encode(1), abi.encode(2));
    }

    function testInvalidKpiTokenTemplateInitializationData() external {
        vm.expectRevert(bytes(""));
        factory.createToken(1, "a", block.timestamp + 60, abi.encode(1), abi.encode(2));
    }

    function testInvalidOracleTemplateInitializationData() external {
        vm.expectRevert(bytes(""));
        factory.createToken(1, "asd", block.timestamp + 60, abi.encode(""), abi.encode(2));
    }

    function testSuccess() external {
        OracleData[] memory _oracles = new OracleData[](1);
        _oracles[0] = OracleData({templateId: 1, data: abi.encode("")});

        address _predictedKpiTokenAddress = kpiTokensManager.predictInstanceAddress(
            address(this), 1, "a", block.timestamp + 60, abi.encode(""), abi.encode(_oracles)
        );

        assertEq(factory.kpiTokensAmount(), 0);
        factory.createToken(1, "a", block.timestamp + 60, abi.encode(""), abi.encode(_oracles));

        assertEq(factory.kpiTokensAmount(), 1);
        assertEq(factory.enumerate(0, 1)[0], _predictedKpiTokenAddress);
    }
}
