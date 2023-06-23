import { TxType } from "@carrot-kpi/react";
import type { FathomRegisteredEventName } from "../../out/fathom/types";

export const TX_FATHOM_EVENTS: Record<TxType, FathomRegisteredEventName> = {
    [TxType.CUSTOM]: "TX_CUSTOM",
    [TxType.ERC20_APPROVAL]: "TX_ERC20_APPROVAL",
    [TxType.KPI_TOKEN_CREATION]: "TX_KPI_TOKEN_CREATION",
    [TxType.KPI_TOKEN_REDEMPTION]: "TX_KPI_TOKEN_REDEMPTION",
    [TxType.KPI_TOKEN_COLLATERAL_RECOVER]: "TX_KPI_TOKEN_COLLATERAL_RECOVER",
    [TxType.ORACLE_FINALIZATION]: "TX_ORACLE_FINALIZATION",
};
