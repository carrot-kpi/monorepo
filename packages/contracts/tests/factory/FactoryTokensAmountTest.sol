pragma solidity 0.8.17;

import {BaseTestSetup} from "../commons/BaseTestSetup.sol";
import {KPITokensFactory} from "../../src/KPITokensFactory.sol";
import {Clones} from "oz/proxy/Clones.sol";
import {OracleData} from "../mocks/MockKPIToken.sol";

/// SPDX-License-Identifier: GPL-3.0-or-later
/// @title KPI tokens factory tokens amount test
/// @dev Tests tokens amount query in KPI tokens factory.
/// @author Federico Luzzi - <federico.luzzi@protonmail.com>
contract FactoryTokensAmountTest is BaseTestSetup {
    function testNoToken() external {
        assertEq(factory.kpiTokensAmount(), 0);
    }

    function testOneToken() external {
        OracleData[] memory _oracles = new OracleData[](1);
        _oracles[0] = OracleData({templateId: 1, data: abi.encode("")});
        factory.createToken(1, "asd", block.timestamp + 60, abi.encode(""), abi.encode(_oracles));
        assertEq(factory.kpiTokensAmount(), 1);
    }

    function testMultipleTokens() external {
        createKpiToken("a");
        createKpiToken("c");

        assertEq(factory.kpiTokensAmount(), 2);
    }
}
