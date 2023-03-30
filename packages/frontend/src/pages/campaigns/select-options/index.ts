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
