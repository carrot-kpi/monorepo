pragma solidity 0.8.17;

import {Initializable} from "oz/proxy/utils/Initializable.sol";
import {IOracle} from "../../src/interfaces/oracles/IOracle.sol";
import {IKPIToken} from "../../src/interfaces/kpi-tokens/IKPIToken.sol";
import {IBaseTemplatesManager, Template} from "../../src/interfaces/IBaseTemplatesManager.sol";
import {InitializeOracleParams} from "../../src/commons/Types.sol";

contract MockOracle is IOracle, Initializable {
    address public constant RESULT_GETTER = address(4321);

    bool public finalized;
    address public kpiToken;
    address internal oraclesManager;
    uint128 internal templateVersion;
    uint256 internal templateId;

    error Forbidden();
    error ZeroAddressKpiToken();

    function initialize(InitializeOracleParams memory _params) external payable override initializer {
        if (_params.kpiToken == address(0)) revert ZeroAddressKpiToken();
        oraclesManager = msg.sender;
        templateVersion = _params.templateVersion;
        templateId = _params.templateId;
        kpiToken = _params.kpiToken;
    }

    function finalize() external {
        if (finalized) revert Forbidden();
        finalized = true;
        IKPIToken(kpiToken).finalize(0);
    }

    function data() external view override returns (bytes memory) {
        return abi.encode("");
    }

    function template() external view override returns (Template memory) {
        return IBaseTemplatesManager(oraclesManager).template(templateId, templateVersion);
    }
}
