import { t } from "i18next";

export enum CampaignOrder {
    NEWEST,
    OLDEST,
}

export const ORDERING_OPTIONS = [
    {
        label: t("orderingOptions.newest"),
        value: CampaignOrder.NEWEST,
    },
    {
        label: t("orderingOptions.oldest"),
        value: CampaignOrder.OLDEST,
    },
];

export const getOrderByLabel = (label: string) => {
    const order = ORDERING_OPTIONS.find((order) => order.label === label);
    if (order) return order;
    else return ORDERING_OPTIONS[0];
};

export enum CampaignState {
    ALL,
    ACTIVE,
    EXPIRED,
    FINALIZED,
}

export const STATE_OPTIONS = [
    {
        label: t("stateOptions.all"),
        value: CampaignState.ALL,
    },
    {
        label: t("stateOptions.active"),
        value: CampaignState.ACTIVE,
    },
    {
        label: t("stateOptions.expired"),
        value: CampaignState.EXPIRED,
    },
    {
        label: t("stateOptions.finalized"),
        value: CampaignState.FINALIZED,
    },
];
