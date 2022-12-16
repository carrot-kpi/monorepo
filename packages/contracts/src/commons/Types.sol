pragma solidity >=0.8.0;

/// SPDX-License-Identifier: GPL-3.0-or-later
/// @title Types
/// @dev General collection of reusable types.
/// @author Federico Luzzi - <federico.luzzi@protonmail.com>

struct TokenAmount {
    address token;
    uint256 amount;
}

struct InitializeKPITokenParams {
    address creator;
    address oraclesManager;
    address kpiTokensManager;
    address feeReceiver;
    uint256 kpiTokenTemplateId;
    uint128 kpiTokenTemplateVersion;
    string description;
    uint256 expiration;
    bytes kpiTokenData;
    bytes oraclesData;
}

struct InitializeOracleParams {
    address creator;
    address kpiToken;
    uint256 templateId;
    uint128 templateVersion;
    bytes data;
}
