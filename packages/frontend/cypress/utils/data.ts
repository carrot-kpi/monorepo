import { faker } from "@faker-js/faker";
/**
 * @exports different data used in tests
 */
export const networks = {
    polygonMumbai: "Polygon Mumbai",
    scrollSepolia: "Scroll Sepolia",
    sepolia: "Sepolia",
};
export const wallets = {
    injectedMetamask: "Injected (MetaMask)",
    metamask: "MetaMask",
    coinBase: "Coinbase Wallet",
};
export const urls = {
    carrotCommunity: "https://www.staging.carrot.community/",
    allCampaigns: "/campaigns?chain=polygon+mumbai",
    createCampaign: "/create/1/draft?chain=polygon+mumbai",
    documentation: "https://docs.staging.carrot.community/",
    audits: "https://github.com/carrot-kpi/contracts/tree/main/audits",
    discord: "https://discord.com/invite/uRer2D4Pdf",
    twitter: "https://twitter.com/CarrotEth",
    carrotInfoPage: "https://www.staging.carrot.community/",
};
export const textData = {
    stagingBannerText:
        "You are using Carrot templates' staging versions. Reach out to the team in Discord for the LIVE released and audited version.",
    interfaceSettings: "Interface settings",
    darkTheme: "Dark theme",
    decentralizationMode: "Decentralization mode",
    stagingMode: "Staging mode",
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
    emptySpace: "Empty space",
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
