import { CARROT_KPI_FRONTEND_I18N_NAMESPACE } from "../../constants";

export const en = {
    [CARROT_KPI_FRONTEND_I18N_NAMESPACE]: {
        "connect.wallet": "Connect wallet",
        "connect.wallet.network": "Network",
        "home.createKPIToken": "Create KPI token",
        "home.loading": "Loading",
        "home.viewCampaign": "View",
        "home.noKPIToken": "No KPI token",
        "home.featuredCampaigns": "Featured campaigns",
        "home.templates": "Templates",
        "home.latestCampaigns": "Latest Campaigns",
        "create.campaign": "Create campaign",
        "create.loading": "Loading",
        "create.template.title": "Title",
        "create.template.version": "Version",
        "create.template.id": "ID",
        "create.template.description": "Description",
        "create.template.use": "Use",
        "create.noKPIToken": "No KPI token",
        "campaign.loading": "Loading",
        "campaign.all": "All Campaigns",
        "templates.viewAll": "View all",
        "preferences.title": "Interface settings",
        "preferences.theme": "Dark theme",
        "preferences.decentralization": "Decentralization mode",
        "preferences.decentralization.info":
            "Decentralization mode tries to route all calls to decentralized options. Onchain calls will be made directly to the targeted blockchain and IPFS data will always be sourced from IPFS directly.\n\nTo get the maximum out of the option, specify your custom RPC and IPFS node URLs below to make Carrot unstoppable.",
        loading: "Loading",
        "coming.soon.dark.theme": "Coming soon",
    },
} as const;
