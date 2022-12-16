pragma solidity 0.8.17;

import {BaseTestSetup} from "../commons/BaseTestSetup.sol";
import {KPITokensManager1} from "../../src/kpi-tokens-managers/KPITokensManager1.sol";
import {IKPITokensManager1} from "../../src/interfaces/kpi-tokens-managers/IKPITokensManager1.sol";
import {Template} from "../../src/interfaces/IBaseTemplatesManager.sol";
import {Clones} from "oz/proxy/Clones.sol";

/// SPDX-License-Identifier: GPL-3.0-or-later
/// @title KPI tokens manager upgrade template test
/// @dev Tests template upgrade in KPI tokens manager.
/// @author Federico Luzzi - <federico.luzzi@protonmail.com>
contract KpiTokensManagerUpgradeTemplateTest is BaseTestSetup {
    function testNonOwner() external {
        vm.prank(address(1));
        vm.expectRevert("Ownable: caller is not the owner");
        kpiTokensManager.upgradeTemplate(1, address(1), "");
    }

    function testNonExistentTemplate() external {
        vm.expectRevert(abi.encodeWithSignature("NonExistentTemplate()"));
        kpiTokensManager.upgradeTemplate(2, address(1), "a");
    }

    function testZeroAddressNewTemplate() external {
        vm.expectRevert(abi.encodeWithSignature("ZeroAddressTemplate()"));
        kpiTokensManager.upgradeTemplate(1, address(0), "");
    }

    function testEmptySpecification() external {
        vm.expectRevert(abi.encodeWithSignature("InvalidSpecification()"));
        kpiTokensManager.upgradeTemplate(1, address(1), "");
    }

    function testSameSpecification() external {
        uint256 _templateId = 1;
        Template memory _template = kpiTokensManager.template(_templateId);
        vm.expectRevert(abi.encodeWithSignature("InvalidSpecification()"));
        kpiTokensManager.upgradeTemplate(_templateId, address(1), _template.specification);
    }

    function testSuccess() external {
        uint256 _templateId = 1;
        Template memory _template = kpiTokensManager.template(_templateId);
        assertEq(_template.id, _templateId);
        assertEq(_template.version, 1);
        string memory _newSpecification = "b";
        address _newAddress = address(123);
        kpiTokensManager.upgradeTemplate(_templateId, _newAddress, _newSpecification);
        _template = kpiTokensManager.template(_templateId);
        assertEq(_template.id, _templateId);
        assertEq(_template.addrezz, _newAddress);
        assertEq(_template.specification, _newSpecification);
        assertEq(_template.version, 2);
    }
}
