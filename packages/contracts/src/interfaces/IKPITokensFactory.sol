pragma solidity >=0.8.0;

/// SPDX-License-Identifier: GPL-3.0-or-later
/// @title KPI tokens factory interface
/// @dev Interface for the KPI tokens factory contract.
/// @author Federico Luzzi - <federico.luzzi@protonmail.com>
interface IKPITokensFactory {
    function createToken(
        uint256 _id,
        string memory _description,
        uint256 _expiration,
        bytes memory _initializationData,
        bytes memory _oraclesInitializationData
    ) external payable returns (address);

    function allowOraclesCreation(address _address) external returns (bool);

    function kpiTokensManager() external returns (address);

    function oraclesManager() external returns (address);

    function feeReceiver() external returns (address);

    function setKpiTokensManager(address _kpiTokensManager) external;

    function setOraclesManager(address _oraclesManager) external;

    function setFeeReceiver(address _feeReceiver) external;

    function kpiTokensAmount() external view returns (uint256);

    function enumerate(uint256 _fromIndex, uint256 _toIndex) external view returns (address[] memory);
}
