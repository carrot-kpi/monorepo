pragma solidity 0.8.17;

import {BaseTestSetup} from "../commons/BaseTestSetup.sol";
import {OraclesManager1} from "../../src/oracles-managers/OraclesManager1.sol";
import {IOraclesManager1} from "../../src/interfaces/oracles-managers/IOraclesManager1.sol";
import {Clones} from "oz/proxy/Clones.sol";

/// SPDX-License-Identifier: GPL-3.0-or-later
/// @title Oracles manager templates enumeration test
/// @dev Tests template enumeration in oracles manager.
/// @author Federico Luzzi - <federico.luzzi@protonmail.com>
contract OraclesManagerEnumerateTest is BaseTestSetup {
    function testNoTemplates() external {
        oraclesManager = new OraclesManager1(address(factory));
        vm.expectRevert(abi.encodeWithSignature("InvalidIndices()"));
        oraclesManager.enumerate(0, 1);
    }

    function testOneTemplateSuccess() external {
        assertEq(oraclesManager.enumerate(0, 1).length, 1);
    }

    function testMultipleTemplatesSuccess() external {
        oraclesManager.addTemplate(address(10), "a");
        oraclesManager.addTemplate(address(11), "b");
        oraclesManager.addTemplate(address(12), "c");
        oraclesManager.addTemplate(address(12), "d");
        oraclesManager.addTemplate(address(12), "e");
        oraclesManager.addTemplate(address(12), "f");
        oraclesManager.addTemplate(address(12), "g");
        oraclesManager.addTemplate(address(12), "h");
        oraclesManager.addTemplate(address(12), "i");
        assertEq(oraclesManager.enumerate(0, 10).length, 10);
    }

    function testInconsistentIndices() external {
        vm.expectRevert(abi.encodeWithSignature("InvalidIndices()"));
        oraclesManager.enumerate(10, 5);
    }

    function testOneTemplateFail() external {
        vm.expectRevert(abi.encodeWithSignature("InvalidIndices()"));
        oraclesManager.enumerate(0, 10);
    }
}
