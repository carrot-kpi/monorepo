/**
 * @exports selectors
 */
export const header = {
    stagingBanner_Text: "[data-testid=staging-banner-text]",
    campaigns_Button: "[data-testid=header-Campaigns-button]",
    profileAvatar_Button: ".rounded-full",
    power_Button: "[data-testid=disconnect-button]",
};
export const networkMenu = {
    networkDropdown_Button: "[data-testid=network-drop-down-button]",
    selectedPolygonMumbain_Icon: "[data-testid='80001-icon']",
    selectedScrollSepoliaNetwork_Icon: "[data-testid='534351-icon']",
    selectedSepoliaNetwork_Icon: "[data-testid=11155111-icon]",
    polygonMumbaiNetwork_Option: "[data-testid='80001-network-button']",
    scrollSepoliaNetwork_Option: "[data-testid='534351-network-button']",
    sepoliaNetwork_Option: "[data-testid=11155111-network-button]",
};
export const walletMenu = {
    connectWallet_Button: "[data-testid=connect-wallet-button]",
    metamask_Button: "[data-testid='MetaMask-wallet-button']",
    coinBase_Button: "[data-testid='Coinbase Wallet-wallet-button']",
};
export const settings = {
    settings_Button: "[data-testid=settings-button]",
    interfaceSettingsTitle_Text: "[data-testid=interface-settings-title]",
    darkTheme_Text: "[data-testid=theme-name-text]",
    decentralizationMode_Text: "[data-testid=decentralization-mode-text]",
    decentralizationMode_Switch: "[data-testid=decentralization-mode-switch]",
    stagingMode_Text: "[data-testid=staging-mode-text]",
    stagingMode_Switch: "[data-testid=staging-mode-switch]",
};
export const heroSection = {
    heroTitle_Text: "[data-testid=hero-section-title-text]",
    heroDescription_Text: "[data-testid=hero-section-description-text]",
    howItWorks_Button: "[data-testid=how-it-works-button]",
    howItWorksVideo_Preview: "[data-testid=video-preview-overlay]",
    createCampaign_Button: "[data-testid=create-campaign-button]",
};
export const campaignsSection = {
    latestCampaign_Text: "[data-testid=latest-campaigns-title-text]",
    viewCampaign_Button: "[data-testid=view-campaign-button]",
    viewAllCampaigns_Button: "[data-testid=view-all-campaigns-button]",
    firstCampaignTitle_Text: "[data-testid='TS01 NOV13-campaign-title']",
};
export const noData = {
    emptySpace_Text: "[data-testid=empty-title-text]",
    noDataFound_Text: "[data-testid=empty-no-data-found-text]",
};
export const templatesSection = {
    templates_Text: "[data-testid=templates-title-text]",
    templateErc20KPIToken_Text:
        "[data-testid='ERC20 KPI token-template-title']",
    useTemplate_Button: "[data-testid=use-template-button]",
};
export const footer = {
    footerAbout_Text: "[data-testid=footer-About-text]",
    footerCommunity_Text: "[data-testid=footer-Community-text]",
    footerDocumentation_Link: "[data-testid=footer-Documentation-button]",
    footerAudits_Link: "[data-testid=footer-Audits-button]",
    footerDiscord_Link: "[data-testid=footer-Discord-button]",
    footerTwitter_Link: "[data-testid=footer-Twitter-button]",
    footerCarrotInfoPage_Button: "[data-testid=footer-carrot-info-page-button]",
};
export const allCampaigns = {};
export const disconnectedWallet = {
    walletDisconnected_Text: "[data-testid=wallet-disconnected-text]",
    walletRequiredDescription_Text:
        "[data-testid=connect-wallet-required-text]",
};
export const welcomeToCarrotModal = {
    title_Text: "//p[contains(text(),'Welcome to Carrot')]",
    description_Text: "//p[contains(text(),'In order to create campaigns')]",
};
