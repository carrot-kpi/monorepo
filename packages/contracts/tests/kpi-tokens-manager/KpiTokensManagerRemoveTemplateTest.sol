pragma solidity 0.8.17;

import {BaseTestSetup} from "../commons/BaseTestSetup.sol";
import {OraclesManager1} from "../../src/oracles-managers/OraclesManager1.sol";
import {IKPITokensManager1} from "../../src/interfaces/kpi-tokens-managers/IKPITokensManager1.sol";
import {IBaseTemplatesManager, Template} from "../../src/interfaces/IBaseTemplatesManager.sol";
import {Clones} from "oz/proxy/Clones.sol";
import {stdStorage, StdStorage} from "forge-std/Test.sol";

/// SPDX-License-Identifier: GPL-3.0-or-later
/// @title KPI tokens manager remove template test
/// @dev Tests template removal in KPI tokens manager.
/// @author Federico Luzzi - <federico.luzzi@protonmail.com>
contract KpiTokensManagerRemoveTemplateTest is BaseTestSetup {
    using stdStorage for StdStorage;

    function testNonOwner() external {
        vm.prank(address(1));
        vm.expectRevert("Ownable: caller is not the owner");
        kpiTokensManager.removeTemplate(1);
    }

    function testNonExistentTemplate() external {
        vm.expectRevert(abi.encodeWithSignature("NonExistentTemplate()"));
        kpiTokensManager.removeTemplate(10);
    }

    function testMultipleDeletionSameId() external {
        assertEq(kpiTokensManager.templatesAmount(), 1);
        kpiTokensManager.removeTemplate(1);
        assertEq(kpiTokensManager.templatesAmount(), 0);
        vm.expectRevert(abi.encodeWithSignature("NonExistentTemplate()"));
        kpiTokensManager.removeTemplate(1);
    }

    function testMultipleDeletionSameIdMultipleTemplate() external {
        kpiTokensManager.addTemplate(address(101), "1");
        kpiTokensManager.addTemplate(address(102), "2");
        kpiTokensManager.addTemplate(address(103), "3");
        assertEq(kpiTokensManager.templatesAmount(), 4);
        kpiTokensManager.removeTemplate(1);
        assertEq(kpiTokensManager.templatesAmount(), 3);
        vm.expectRevert(abi.encodeWithSignature("NonExistentTemplate()"));
        kpiTokensManager.removeTemplate(1);
    }

    function testSuccess() external {
        Template memory _template = kpiTokensManager.template(1);
        assertEq(_template.id, 1);
        kpiTokensManager.removeTemplate(1);
        vm.expectRevert(abi.encodeWithSignature("NonExistentTemplate()"));
        kpiTokensManager.template(1);
    }
}
