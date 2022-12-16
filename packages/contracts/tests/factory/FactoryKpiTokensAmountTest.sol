pragma solidity 0.8.17;

import {BaseTestSetup} from "../commons/BaseTestSetup.sol";
import {KPITokensFactory} from "../../src/KPITokensFactory.sol";
import {KPITokensManager1} from "../../src/kpi-tokens-managers/KPITokensManager1.sol";
import {OraclesManager1} from "../../src/oracles-managers/OraclesManager1.sol";

/// SPDX-License-Identifier: GPL-3.0-or-later
/// @title Factory KPI tokens amount test
/// @dev Tests KPI tokens enumeration.
/// @author Federico Luzzi - <federico.luzzi@protonmail.com>
contract FactoryKpiTokensAmountTest is BaseTestSetup {
    function testNoTemplates() external {
        factory = new KPITokensFactory(address(1), address(2), address(3));
        assertEq(factory.kpiTokensAmount(), 0);
    }

    function testOneTemplate() external {
        factory = new KPITokensFactory(address(1), address(1), address(this));
        kpiTokensManager = new KPITokensManager1(address(factory));
        kpiTokensManager.addTemplate(address(mockKpiTokenTemplate), "fake");

        oraclesManager = new OraclesManager1(address(factory));
        oraclesManager.addTemplate(address(mockOracleTemplate), "fake");

        factory.setKpiTokensManager(address(kpiTokensManager));
        factory.setOraclesManager(address(oraclesManager));
        createKpiToken("asd");
        assertEq(factory.kpiTokensAmount(), 1);
    }

    function testMultipleTemplates() external {
        createKpiToken("a");
        createKpiToken("c");
        assertEq(factory.kpiTokensAmount(), 2);
    }
}
