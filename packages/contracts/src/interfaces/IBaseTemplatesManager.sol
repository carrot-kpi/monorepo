pragma solidity >=0.8.0;

struct Template {
    address addrezz;
    uint128 version;
    uint256 id;
    string specification;
}

/// SPDX-License-Identifier: GPL-3.0-or-later
/// @title Base templates manager interface
/// @dev Interface for the base templates manager contract.
/// @author Federico Luzzi - <federico.luzzi@protonmail.com>
interface IBaseTemplatesManager {
    function addTemplate(address _template, string calldata _specification) external;

    function removeTemplate(uint256 _id) external;

    function upgradeTemplate(uint256 _id, address _newTemplate, string calldata _newSpecification) external;

    function updateTemplateSpecification(uint256 _id, string calldata _newSpecification) external;

    function template(uint256 _id) external view returns (Template memory);

    function template(uint256 _id, uint128 _version) external view returns (Template memory);

    function exists(uint256 _id) external view returns (bool);

    function templatesAmount() external view returns (uint256);

    function enumerate(uint256 _fromIndex, uint256 _toIndex) external view returns (Template[] memory);
}
