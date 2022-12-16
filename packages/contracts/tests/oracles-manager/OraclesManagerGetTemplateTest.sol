pragma solidity 0.8.17;

import {BaseTestSetup} from "../commons/BaseTestSetup.sol";
import {OraclesManager1} from "../../src/oracles-managers/OraclesManager1.sol";
import {IOraclesManager1} from "../../src/interfaces/oracles-managers/IOraclesManager1.sol";
import {Template} from "../../src/interfaces/IBaseTemplatesManager.sol";
import {Clones} from "oz/proxy/Clones.sol";

/// SPDX-License-Identifier: GPL-3.0-or-later
/// @title Oracles manager get template test
/// @dev Tests template query in oracles manager.
/// @author Federico Luzzi - <federico.luzzi@protonmail.com>
contract OraclesManagerGetTemplateTest is BaseTestSetup {
    function testNonExistentTemplate() external {
        vm.expectRevert(abi.encodeWithSignature("NonExistentTemplate()"));
        oraclesManager.template(0);
    }

    function testSuccess() external {
        uint256 _templateId = 1;
        Template memory _template = oraclesManager.template(_templateId);
        assertEq(_template.id, _templateId);
        assertEq(_template.addrezz, address(mockOracleTemplate));
        assertEq(_template.version, 1);
        assertEq(_template.specification, MOCK_ORACLE_SPECIFICATION);
    }
}
