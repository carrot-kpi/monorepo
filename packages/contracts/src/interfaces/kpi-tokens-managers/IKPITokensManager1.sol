pragma solidity >=0.8.0;

import {IBaseTemplatesManager} from "../IBaseTemplatesManager.sol";

/// SPDX-License-Identifier: GPL-3.0-or-later
/// @title KPI tokens manager interface
/// @dev Interface for the KPI tokens manager contract.
/// @author Federico Luzzi - <federico.luzzi@protonmail.com>
interface IKPITokensManager1 is IBaseTemplatesManager {
    function predictInstanceAddress(
        address _creator,
        uint256 _id,
        string memory _description,
        uint256 _expiration,
        bytes memory _initializationData,
        bytes memory _oraclesInitializationData
    ) external view returns (address);

    function instantiate(
        address _creator,
        uint256 _templateId,
        string memory _description,
        uint256 _expiration,
        bytes memory _initializationData,
        bytes memory _oraclesInitializationData
    ) external returns (address, uint128);
}
