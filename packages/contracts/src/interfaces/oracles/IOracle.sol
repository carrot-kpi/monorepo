pragma solidity >=0.8.0;

import {IOraclesManager1} from "../oracles-managers/IOraclesManager1.sol";
import {InitializeOracleParams} from "../../commons/Types.sol";
import {Template} from "../IBaseTemplatesManager.sol";

/// SPDX-License-Identifier: GPL-3.0-or-later
/// @title Oracle interface
/// @dev Oracle interface.
/// @author Federico Luzzi - <federico.luzzi@protonmail.com>
interface IOracle {
    function initialize(InitializeOracleParams memory _params) external payable;

    function kpiToken() external returns (address);

    function template() external view returns (Template memory);

    function finalized() external returns (bool);

    function data() external view returns (bytes memory);
}
