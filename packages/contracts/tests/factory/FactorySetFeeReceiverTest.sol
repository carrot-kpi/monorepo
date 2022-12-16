pragma solidity 0.8.17;

import {BaseTestSetup} from "../commons/BaseTestSetup.sol";

/// SPDX-License-Identifier: GPL-3.0-or-later
/// @title Factory set fee receiver test
/// @dev Tests factory setter for the fee receiver.
/// @author Federico Luzzi - <federico.luzzi@protonmail.com>
contract FactorySetFeeReceiverTest is BaseTestSetup {
    function testNonOwner() external {
        vm.prank(address(1));
        vm.expectRevert("Ownable: caller is not the owner");
        factory.setFeeReceiver(address(2));
    }

    function testZeroAddressFeeReceiver() external {
        vm.expectRevert(abi.encodeWithSignature("ZeroAddressFeeReceiver()"));
        factory.setFeeReceiver(address(0));
    }

    function testSuccess() external {
        assertEq(factory.feeReceiver(), feeReceiver);
        address _newFeeReceiver = address(2);
        factory.setFeeReceiver(_newFeeReceiver);
        assertEq(factory.feeReceiver(), _newFeeReceiver);
    }
}
