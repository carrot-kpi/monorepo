pragma solidity 0.8.17;

import {Test} from "forge-std/Test.sol";
import {KPITokensManager1} from "../../src/kpi-tokens-managers/KPITokensManager1.sol";
import {OraclesManager1} from "../../src/oracles-managers/OraclesManager1.sol";
import {KPITokensFactory} from "../../src/KPITokensFactory.sol";
import {MockKPIToken, OracleData} from "../mocks/MockKPIToken.sol";
import {MockOracle} from "../mocks/MockOracle.sol";

/// SPDX-License-Identifier: GPL-3.0-or-later
/// @title Base test setup
/// @dev Test hook to set up a base test environment for each test.
/// @author Federico Luzzi - <federico.luzzi@protonmail.com>
abstract contract BaseTestSetup is Test {
    string internal constant MOCK_KPI_TOKEN_SPECIFICATION = "fake-kpi-token-spec";
    string internal constant MOCK_ORACLE_SPECIFICATION = "fake-oracle-spec";

    address internal feeReceiver;
    KPITokensFactory internal factory;
    MockKPIToken internal mockKpiTokenTemplate;
    KPITokensManager1 internal kpiTokensManager;
    MockOracle internal mockOracleTemplate;
    OraclesManager1 internal oraclesManager;

    function setUp() external {
        feeReceiver = address(400);
        factory = new KPITokensFactory(address(1), address(1), feeReceiver);

        mockKpiTokenTemplate = new MockKPIToken();
        kpiTokensManager = new KPITokensManager1(address(factory));
        kpiTokensManager.addTemplate(address(mockKpiTokenTemplate), "fake-kpi-token-spec");

        mockOracleTemplate = new MockOracle();
        oraclesManager = new OraclesManager1(address(factory));
        oraclesManager.addTemplate(address(mockOracleTemplate), "fake-oracle-spec");

        factory.setKpiTokensManager(address(kpiTokensManager));
        factory.setOraclesManager(address(oraclesManager));
    }

    function createKpiToken(string memory _description) internal returns (MockKPIToken) {
        OracleData[] memory _oracles = new OracleData[](1);
        _oracles[0] = OracleData({templateId: 1, data: abi.encode(_description)});

        return MockKPIToken(
            factory.createToken(1, _description, block.timestamp + 60, abi.encode(""), abi.encode(_oracles))
        );
    }
}
