import { faker } from "@faker-js/faker";
/**
 * @exports different data used in tests
 */
export const networks = {
    arbitrum: "Arbitrum Sepolia",
    sepolia: "Sepolia",
};
export const wallets = {
    metamask: "MetaMask",
    coinBase: "Coinbase Wallet",
    walletConnect: "WalletConnect",
};
export const urls = {
    local: "http://127.0.0.1:3000",
    dev: "https://app.dev.carrot.community/#/?chain=arbitrum+sepolia",
    stage: "https://app.staging.carrot.community/#/?chain=sepolia",
    carrotCommunity: "https://www.staging.carrot.community/",
    allCampaigns: "/campaigns",
    createCampaign: "/create/1/draft",
    documentation: "https://docs.staging.carrot.community/",
    audits: "https://github.com/carrot-kpi/contracts/tree/main/audits",
    discord: "https://discord.com/invite/uRer2D4Pdf",
    twitter: "https://twitter.com/CarrotEth",
};
export const textData = {
    devBannerText:
        "You are using Carrot templates' preview versions. Reach out to the team in Discord for the LIVE released and audited version.",
    stagingBannerText:
        "You are using Carrot templates' staging versions. Reach out to the team in Discord for the LIVE released and audited version.",
    interfaceSettings: "Interface settings",
    darkTheme: "Dark theme",
    decentralizationMode: "Decentralization mode",
    templatePreviewMode: "Template preview mode",
    heroSectionTitle: "Reach your goals with a Carrot",
    heroSectionDescription:
        "Easy and powerful tool to create conditional tokens allowing an effective method to achieve any goal desirable using permissionless, decentralized technologies.",
    latestCampaigns: "Latest Campaigns",
    templatest: "Templates",
    footerAbout: "About",
    footerCommunity: "Community",
    walletDisconnected: "Wallet disconnected",
    walletRequiredDescription: "A connected wallet is required to continue.",
    welcomeToCarrot: "Welcome to Carrot",
    authenticateDescription:
        "In order to create campaigns it's necessary to sign a message. This request will not trigger a blockchain transaction or cost you any fees.",
    allCampaignsTitle: "All Campaigns",
    emptySpace: "No transactions",
    noDataFound: "No data found. Please try again later.",
};
export const campaignData = {
    randomCampaignTitle: "",
    title: "Automation Test Campaign",
    description: faker.lorem.words(10),
    tag: "Automation",
    expiryDate: "",
    tokenName: "Automation testing",
    tokenSymbol: "ATST",
    tokenSupply: "100",
    rewardAmount: "100",
    goalValue: "18",
};
export const templateData = {
    erc20Title: "ERC20 KPI token",
};
