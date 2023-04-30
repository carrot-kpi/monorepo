import { TxType } from "../types";
import { FathomRegisteredEventName } from "./generated";

declare global {
    interface Window {
        fathom?: Fathom;
    }
}

export const TX_FATHOM_EVENTS: Record<TxType, FathomRegisteredEventName> = {
    [TxType.CUSTOM]: "TX_CUSTOM",
    [TxType.ERC20_APPROVAL]: "TX_ERC20_APPROVAL",
    [TxType.KPI_TOKEN_CREATION]: "TX_KPI_TOKEN_CREATION",
    [TxType.KPI_TOKEN_REDEMPTION]: "TX_KPI_TOKEN_REDEMPTION",
    [TxType.ORACLE_FINALIZATION]: "TX_ORACLE_FINALIZATION",
};

export interface Fathom {
    siteId: string;
    blockTrackingForMe(): void;
    enableTrackingForMe(): void;
    setSite(siteId: string): void;
    trackGoal(goalId: string, data: number): void;
    trackRegisteredGoal(goalId: FathomRegisteredEventName, data: number): void;
    trackPageview(params?: { url?: string; referref?: string }): void;
}
