pragma solidity 0.8.17;

import {ClonesUpgradeable} from "oz-upgradeable/proxy/ClonesUpgradeable.sol";
import {IOracle} from "../interfaces/oracles/IOracle.sol";
import {BaseTemplatesManager, Template} from "../BaseTemplatesManager.sol";
import {IKPITokensFactory} from "../interfaces/IKPITokensFactory.sol";
import {InitializeOracleParams} from "../commons/Types.sol";
import {IOraclesManager1} from "../interfaces/oracles-managers/IOraclesManager1.sol";

/// SPDX-License-Identifier: GPL-3.0-or-later
/// @title Oracles manager
/// @dev The templates manager contract acts as a template
/// registry for oracle implementations. Additionally,
/// templates can also only be instantiated by the manager itself,
/// exclusively by request of a KPI token being created. All
/// templates-related functions are governance-gated
/// (addition, removal, upgrade of templates and more) and the
/// governance contract must be the owner of the oracles manager.
/// @author Federico Luzzi - <federico.luzzi@protonmail.com>
contract OraclesManager1 is BaseTemplatesManager, IOraclesManager1 {
    constructor(address _factory) BaseTemplatesManager(_factory) {}

    /// @dev Calculates the salt value used in CREATE2 when
    /// instantiating new templates. the salt is calculated as
    /// keccak256(abi.encodePacked(`_creator`, `_initializationData`)).
    /// @param _creator The KPI token creator.
    /// @param _initializationData The template-specific ABI-encoded initialization data.
    /// @return The salt value.
    function salt(address _creator, uint256 _templateId, bytes calldata _initializationData)
        internal
        pure
        returns (bytes32)
    {
        return keccak256(abi.encodePacked(_creator, _templateId, _initializationData));
    }

    /// @dev Predicts an template instance address based on the input data.
    /// @param _creator The KPI token creator.
    /// @param _id The id of the template that is to be instantiated.
    /// @param _initializationData The template-specific ABI-encoded initialization data.
    /// @return The address at which the template with the given input
    /// parameters will be instantiated.
    function predictInstanceAddress(address _creator, uint256 _id, bytes calldata _initializationData)
        external
        view
        override
        returns (address)
    {
        return ClonesUpgradeable.predictDeterministicAddress(
            latestVersionStorageTemplate(_id).addrezz, salt(_creator, _id, _initializationData), address(this)
        );
    }

    /// @dev Instantiates a given oracle template using EIP 1167 minimal proxies.
    /// The input data will both be used to choose the instantiated template
    /// and to feed it initialization data. This function checks that the
    /// factory allows the oracle instantiation.
    /// @param _creator The KPI token creator.
    /// @param _id The id of the template that is to be instantiated.
    /// @param _initializationData The template-specific ABI-encoded initialization data.
    /// @return The address at which the template with the given input
    /// parameters has been instantiated.
    function instantiate(address _creator, uint256 _id, bytes calldata _initializationData)
        external
        payable
        override
        returns (address)
    {
        if (!IKPITokensFactory(factory).allowOraclesCreation(msg.sender)) {
            revert Forbidden();
        }
        Template storage _template = latestVersionStorageTemplate(_id);
        address _instance =
            ClonesUpgradeable.cloneDeterministic(_template.addrezz, salt(_creator, _id, _initializationData));
        IOracle(_instance).initialize{value: msg.value}(
            InitializeOracleParams({
                creator: _creator,
                kpiToken: msg.sender,
                templateId: _id,
                templateVersion: _template.version,
                data: _initializationData
            })
        );
        return _instance;
    }
}
