pragma solidity 0.8.17;

import {BaseTestSetup} from "../commons/BaseTestSetup.sol";
import {KPITokensManager1} from "../../src/kpi-tokens-managers/KPITokensManager1.sol";

/// SPDX-License-Identifier: GPL-3.0-or-later
/// @title KPI tokens manager instantiation test
/// @dev Tests KPI tokens manager instantiation.
/// @author Federico Luzzi - <federico.luzzi@protonmail.com>
contract KpiTokensManagerInstantiationTest is BaseTestSetup {
    function testZeroAddressFactory() external {
        vm.expectRevert(abi.encodeWithSignature("ZeroAddressFactory()"));
        new KPITokensManager1(address(0));
    }
}
