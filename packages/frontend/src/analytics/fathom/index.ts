import { TxType } from "@carrot-kpi/react";
import { FathomRegisteredEventName } from "./generated";

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

export const initializeFathom = (
    siteId?: string,
    scriptURL = "https://cdn.usefathom.com/script.js"
) => {
    return new Promise<void>((resolve, reject) => {
        if (!siteId) {
            console.warn("could not initilize fathom, site id missing");
            return reject("site id missing");
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if ((window as any).fathom) {
            console.warn("fathom is already in window");
            return resolve();
        }

        const script = document.createElement("script");
        script.setAttribute("data-site", siteId);
        script.setAttribute("data-auto", "false");
        script.setAttribute("data-spa", "auto");
        script.onload = () => resolve();
        script.defer = true;
        script.src = scriptURL;
        document.head.appendChild(script);
    });
};
