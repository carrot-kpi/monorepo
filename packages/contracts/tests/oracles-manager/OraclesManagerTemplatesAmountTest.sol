pragma solidity 0.8.17;

import {BaseTestSetup} from "../commons/BaseTestSetup.sol";
import {OraclesManager1} from "../../src/oracles-managers/OraclesManager1.sol";
import {IOraclesManager1} from "../../src/interfaces/oracles-managers/IOraclesManager1.sol";
import {Clones} from "oz/proxy/Clones.sol";

/// SPDX-License-Identifier: GPL-3.0-or-later
/// @title Oracles manager templates amount test
/// @dev Tests templates amount query in oracles manager.
/// @author Federico Luzzi - <federico.luzzi@protonmail.com>
contract OraclesManagerTemplatesAmountTest is BaseTestSetup {
    function testNoTemplates() external {
        oraclesManager = new OraclesManager1(address(factory));
        assertEq(oraclesManager.templatesAmount(), 0);
    }

    function testOneTemplate() external {
        assertEq(oraclesManager.templatesAmount(), 1);
    }

    function testMultipleTemplates() external {
        oraclesManager.addTemplate(address(10), "a");
        oraclesManager.addTemplate(address(11), "b");
        oraclesManager.addTemplate(address(12), "c");
        assertEq(oraclesManager.templatesAmount(), 4);
    }
}
