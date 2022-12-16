pragma solidity >=0.8.0;

import {InitializeKPITokenParams} from "../../commons/Types.sol";
import {IKPITokensManager1} from "../kpi-tokens-managers/IKPITokensManager1.sol";
import {Template} from "../IBaseTemplatesManager.sol";

/// SPDX-License-Identifier: GPL-3.0-or-later
/// @title KPI token interface
/// @dev KPI token interface.
/// @author Federico Luzzi - <federico.luzzi@protonmail.com>
interface IKPIToken {
    function initialize(InitializeKPITokenParams memory _params)
        external
        payable;

    function finalize(uint256 _result) external;

    function redeem(bytes memory _data) external;

    function owner() external view returns (address);

    function transferOwnership(address _newOwner) external;

    function template() external view returns (Template memory);

    function description() external view returns (string memory);

    function finalized() external view returns (bool);

    function expiration() external view returns (uint256);

    function data() external view returns (bytes memory);

    function oracles() external view returns (address[] memory);
}
