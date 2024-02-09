import dotenv from "dotenv";

dotenv.config();

export const metamaskData = {
    metamaskID: "",
    metamaskPassword: "Test123!",
    coston2Network: [
        "Polygon Mumbai",
        "https://rpc.ankr.com/polygon_mumbai",
        "80001",
        "MATIC",
        "https://mumbai.polygonscan.com",
    ],
    mnemonic:
        "test, test, test, test, test, test, test, test, test, test, test, junk".split(
            ", ",
        ),
};

/**
 * @exports different data used in tests
 */
export const networks = {
    polygonMumbai: "Polygon Mumbai",
    scrollSepolia: "Scroll Sepolia",
    sepolia: "Sepolia",
};
export const wallets = {
    coinBase: "Coinbase Wallet",
    metamask: "MetaMask",
    walletConnect: "Created with Sketch.WalletConnect",
    brave: "Brave Wallet",
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
    polygonScan: "https://mumbai.polygonscan.com/address/",
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
    emptySpace: "Empty space",
    noDataFound: "No data found. Please try again later.",
    noTransactions: "No transactions",
    noDraftSaved: "No drafts saved",
    trySavingNewDraft: "Try saving a new draft when creating a new campaign.",
};
export const campaignData = {
    firstCampaign: "TS01 NOV13",
    title: "",
};
export const templateData = {
    erc20Title: "ERC20 KPI token",
};
