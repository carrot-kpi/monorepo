pragma solidity >=0.8.0;

import {IBaseTemplatesManager} from "../IBaseTemplatesManager.sol";

/// SPDX-License-Identifier: GPL-3.0-or-later
/// @title Oracles manager interface
/// @dev Interface for the oracles manager contract.
/// @author Federico Luzzi - <federico.luzzi@protonmail.com>
interface IOraclesManager1 is IBaseTemplatesManager {
    function predictInstanceAddress(
        address _creator,
        uint256 _id,
        bytes memory _initializationData
    ) external view returns (address);

    function instantiate(
        address _creator,
        uint256 _id,
        bytes memory _initializationData
    ) external payable returns (address);
}
