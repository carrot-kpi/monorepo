pragma solidity 0.8.17;

import {BaseTestSetup} from "../commons/BaseTestSetup.sol";
import {OraclesManager1} from "../../src/oracles-managers/OraclesManager1.sol";
import {IOraclesManager1} from "../../src/interfaces/oracles-managers/IOraclesManager1.sol";
import {Template} from "../../src/interfaces/IBaseTemplatesManager.sol";
import {Clones} from "oz/proxy/Clones.sol";

/// SPDX-License-Identifier: GPL-3.0-or-later
/// @title Oracles manager update template specification test
/// @dev Tests template specification update in oracles manager.
/// @author Federico Luzzi - <federico.luzzi@protonmail.com>
contract OraclesManagerUpdateTemplateSpecificationTest is BaseTestSetup {
    function testNonOwner() external {
        vm.prank(address(1));
        vm.expectRevert("Ownable: caller is not the owner");
        oraclesManager.updateTemplateSpecification(0, "");
    }

    function testNonExistentTemplate() external {
        vm.expectRevert(abi.encodeWithSignature("NonExistentTemplate()"));
        oraclesManager.updateTemplateSpecification(0, "a");
    }

    function testEmptySpecification() external {
        vm.expectRevert(abi.encodeWithSignature("InvalidSpecification()"));
        oraclesManager.updateTemplateSpecification(0, "");
    }

    function testSuccess() external {
        string memory _oldSpecification = "a";
        oraclesManager.addTemplate(address(2), _oldSpecification);
        uint256 _templateId = oraclesManager.templatesAmount();
        Template memory _template = oraclesManager.template(_templateId);
        assertEq(_template.id, _templateId);
        assertEq(_template.specification, _oldSpecification);
        string memory _newSpecification = "b";
        oraclesManager.updateTemplateSpecification(_templateId, _newSpecification);
        _template = oraclesManager.template(_templateId);
        assertEq(_template.id, _templateId);
        assertEq(_template.specification, _newSpecification);
    }
}
