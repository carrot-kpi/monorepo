pragma solidity 0.8.17;

import {BaseTestSetup} from "../commons/BaseTestSetup.sol";
import {OraclesManager1} from "../../src/oracles-managers/OraclesManager1.sol";
import {IOraclesManager1} from "../../src/interfaces/oracles-managers/IOraclesManager1.sol";
import {Template} from "../../src/interfaces/IBaseTemplatesManager.sol";
import {Clones} from "oz/proxy/Clones.sol";

/// SPDX-License-Identifier: GPL-3.0-or-later
/// @title Oracles manager add template test
/// @dev Tests template addition in oracles manager.
/// @author Federico Luzzi - <federico.luzzi@protonmail.com>
contract OraclesManagerAddTemplateTest is BaseTestSetup {
    function testNonOwner() external {
        vm.prank(address(1));
        vm.expectRevert("Ownable: caller is not the owner");
        oraclesManager.addTemplate(address(2), "");
    }

    function testZeroAddressTemplate() external {
        vm.expectRevert(abi.encodeWithSignature("ZeroAddressTemplate()"));
        oraclesManager.addTemplate(address(0), "");
    }

    function testEmptySpecification() external {
        vm.expectRevert(abi.encodeWithSignature("InvalidSpecification()"));
        oraclesManager.addTemplate(address(1), "");
    }

    function testSuccess() external {
        string memory _specification = "test";
        address _templateAddress = address(1);
        oraclesManager.addTemplate(_templateAddress, _specification);
        uint256 _addedTemplateId = oraclesManager.templatesAmount();
        Template memory _template = oraclesManager.template(_addedTemplateId);
        assertEq(_template.addrezz, _templateAddress);
        assertEq(_template.version, 1);
        assertEq(_template.specification, _specification);
        assertEq(_template.id, _addedTemplateId);
    }
}
