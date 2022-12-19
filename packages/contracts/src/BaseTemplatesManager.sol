pragma solidity 0.8.17;

import {Ownable} from "oz/access/Ownable.sol";
import {Clones} from "oz/proxy/Clones.sol";
import {IKPIToken} from "./interfaces/kpi-tokens/IKPIToken.sol";
import {IOracle} from "./interfaces/oracles/IOracle.sol";
import {IBaseTemplatesManager, Template} from "./interfaces/IBaseTemplatesManager.sol";
import {IKPITokensFactory} from "./interfaces/IKPITokensFactory.sol";

/// SPDX-License-Identifier: GPL-3.0-or-later
/// @title Templates manager
/// @dev The templates manager contract acts as a template
/// registry for oracles/kpi token implementations. Additionally,
/// templates can also only be instantiated by the manager itself,
/// (exclusively by request of either the factory, in case of KPI
/// tokens, or a KPI token being created in case of oracles). All
/// template-related functions are governance-gated
/// (addition, removal, upgrade of templates and more) and the
/// governance contract must be the owner of the templates manager.
/// The contract will keep track of all the versions of every template
/// and will keep history of even deleted/unactive templates.
/// @author Federico Luzzi - <federico.luzzi@protonmail.com>
abstract contract BaseTemplatesManager is Ownable, IBaseTemplatesManager {
    address public factory;
    uint256 internal templateId;
    Template[] internal latestVersionTemplates;
    mapping(uint256 => uint256) internal templateIdToLatestVersionIndex;
    mapping(uint256 => mapping(uint128 => Template))
        internal templateByIdAndVersion;

    error NonExistentTemplate();
    error ZeroAddressFactory();
    error Forbidden();
    error ZeroAddressTemplate();
    error InvalidSpecification();
    error NoKeyForTemplate();
    error InvalidVersionBump();
    error InvalidIndices();
    error AutomationNotSupported();

    event AddTemplate(
        uint256 indexed id,
        address indexed template,
        string specification
    );
    event RemoveTemplate(uint256 indexed id, uint256 version);
    event UpgradeTemplate(
        uint256 indexed id,
        address indexed newTemplate,
        uint256 newVersion,
        string newSpecification
    );
    event UpdateTemplateSpecification(
        uint256 indexed id,
        uint256 version,
        string newSpecification
    );

    constructor(address _factory) {
        if (_factory == address(0)) revert ZeroAddressFactory();
        factory = _factory;
    }

    /// @dev Adds a template to the registry. This function can only be called
    /// by the contract owner (governance).
    /// @param _template The template's address.
    /// @param _specification An IPFS cid pointing to a structured JSON
    /// describing the template.
    function addTemplate(address _template, string calldata _specification)
        external
        override
        onlyOwner
    {
        if (_template == address(0)) revert ZeroAddressTemplate();
        if (bytes(_specification).length == 0) revert InvalidSpecification();
        uint256 _id = ++templateId;
        Template memory _templateStruct = Template({
            id: _id,
            addrezz: _template,
            version: 1,
            specification: _specification
        });
        latestVersionTemplates.push(_templateStruct);
        templateIdToLatestVersionIndex[_id] = latestVersionTemplates.length;

        // save an immutable copy of the template at this initial version for
        // historical reasons
        templateByIdAndVersion[_id][1] = _templateStruct;
        emit AddTemplate(_id, _template, _specification);
    }

    /// @dev Removes a template from the registry. This function can only be called
    /// by the contract owner (governance).
    /// @param _id The id of the template that must be removed.
    function removeTemplate(uint256 _id) external override onlyOwner {
        uint256 _index = templateIdToLatestVersionIndex[_id];
        if (_index == 0) revert NonExistentTemplate();
        Template storage _lastLatestVersionTemplate = latestVersionTemplates[
            latestVersionTemplates.length - 1
        ];
        uint256 _version = _lastLatestVersionTemplate.version;
        if (_lastLatestVersionTemplate.id != _id) {
            latestVersionTemplates[_index - 1] = _lastLatestVersionTemplate;
            templateIdToLatestVersionIndex[
                _lastLatestVersionTemplate.id
            ] = _index;
        }
        delete templateIdToLatestVersionIndex[_id];
        latestVersionTemplates.pop();
        emit RemoveTemplate(_id, _version);
    }

    /// @dev Updates a template specification. The specification is a cid
    /// pointing to a structured JSON file containing data about the template.
    /// This function can only be called by the contract owner (governance).
    /// @param _id The template's id.
    /// @param _newSpecification the updated specification for the template with id `_id`.
    function updateTemplateSpecification(
        uint256 _id,
        string calldata _newSpecification
    ) external override onlyOwner {
        if (bytes(_newSpecification).length == 0) revert InvalidSpecification();
        Template storage _template = latestVersionStorageTemplate(_id);
        _template.specification = _newSpecification;
        emit UpdateTemplateSpecification(
            _id,
            _template.version,
            _newSpecification
        );
    }

    /// @dev Upgrades a template. This function can only be called by the contract owner (governance).
    /// @param _id The id of the template that needs to be upgraded.
    /// @param _newTemplate The new address of the template.
    /// @param _newSpecification The updated specification for the upgraded template.
    function upgradeTemplate(
        uint256 _id,
        address _newTemplate,
        string calldata _newSpecification
    ) external override onlyOwner {
        if (_newTemplate == address(0)) revert ZeroAddressTemplate();
        if (bytes(_newSpecification).length == 0) revert InvalidSpecification();
        Template
            storage _latestVersionTemplateFromStorage = latestVersionStorageTemplate(
                _id
            );
        if (
            keccak256(bytes(_latestVersionTemplateFromStorage.specification)) ==
            keccak256(bytes(_newSpecification))
        ) {
            revert InvalidSpecification();
        }
        _latestVersionTemplateFromStorage.addrezz = _newTemplate;
        _latestVersionTemplateFromStorage.specification = _newSpecification;
        uint128 _updatedVersion = _latestVersionTemplateFromStorage.version + 1;
        _latestVersionTemplateFromStorage.version = _updatedVersion;

        templateByIdAndVersion[_id][_updatedVersion] = Template({
            id: _id,
            addrezz: _newTemplate,
            specification: _newSpecification,
            version: _updatedVersion
        });
        emit UpgradeTemplate(
            _id,
            _newTemplate,
            _updatedVersion,
            _newSpecification
        );
    }

    /// @dev Gets a template from storage, in its latest, most up
    /// to date version.
    /// @param _id The id of the template that needs to be fetched.
    /// @return The template from storage with id `_id` in its most
    /// up to date version.
    function latestVersionStorageTemplate(uint256 _id)
        internal
        view
        returns (Template storage)
    {
        if (_id == 0) revert NonExistentTemplate();
        uint256 _index = templateIdToLatestVersionIndex[_id];
        if (_index == 0) revert NonExistentTemplate();
        Template storage _template = latestVersionTemplates[_index - 1];
        return _template;
    }

    /// @dev Gets a template by id. This only works on latest-version
    /// templates, so the latest version of the template with id `_id`
    /// will be returned. To check out old versions use
    /// `template(uint256 _id, uint128 _version)`.
    /// @param _id The id of the template that needs to be fetched.
    /// @return The template with id `_id`, at its latest, most up to
    /// date version.
    function template(uint256 _id)
        external
        view
        override
        returns (Template memory)
    {
        return latestVersionStorageTemplate(_id);
    }

    /// @dev Gets a template by id and version. Can be used to fetch
    /// old version templates to maximize transparency.
    /// @param _id The id of the template that needs to be fetched.
    /// @param _version The version at which the template should be fetched.
    /// @return The template with id `_id` at version `_version`.
    function template(uint256 _id, uint128 _version)
        external
        view
        override
        returns (Template memory)
    {
        if (_id == 0) revert NonExistentTemplate();
        Template memory _template = templateByIdAndVersion[_id][_version];
        if (_template.addrezz == address(0)) revert NonExistentTemplate();
        return _template;
    }

    /// @dev Used to determine whether a template with a certain id exists
    /// or not. This function checks existance on the latest version of each
    /// template. I.e. if a template existed in the past and got deleted, this
    /// will return false.
    /// @param _id The id of the template that needs to be checked.
    /// @return True if the template exists, false otherwise.
    function exists(uint256 _id) external view override returns (bool) {
        if (_id == 0) return false;
        uint256 _index = templateIdToLatestVersionIndex[_id];
        if (_index == 0) return false;
        return latestVersionTemplates[_index - 1].id == _id;
    }

    /// @dev Gets the amount of all registered templates (works on the latest
    // versions template array and doesn't take into account deleted templates).
    /// @return The templates amount.
    function templatesAmount() external view override returns (uint256) {
        return latestVersionTemplates.length;
    }

    /// @dev Gets a templates slice off of the latest version templates array based
    /// on indexes. N.B.: the templates are not ordered and due to how templates are
    /// removed, it could happen to have 2 disjointed slices with the same template
    /// being in both, even though it should be rare.
    /// @param _fromIndex The index from which to get templates (inclusive).
    /// @param _toIndex The maximum index to which to get templates (the element at this index won't be included).
    /// @return A templates array representing the slice taken through the given indexes.
    function enumerate(uint256 _fromIndex, uint256 _toIndex)
        external
        view
        override
        returns (Template[] memory)
    {
        if (_toIndex > latestVersionTemplates.length || _fromIndex > _toIndex) {
            revert InvalidIndices();
        }
        uint256 _range = _toIndex - _fromIndex;
        Template[] memory _templates = new Template[](_range);
        for (uint256 _i = 0; _i < _range; _i++) {
            _templates[_i] = latestVersionTemplates[_fromIndex + _i];
        }
        return _templates;
    }
}
