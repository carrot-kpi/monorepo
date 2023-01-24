const TRUST_WALLET_CHAIN: { [chainId: number]: string } = {
    100: "xdai",
    137: "polygon",
    1: "ethereum",
    42161: "arbitrum",
};

export const getDefaultERC20TokenLogoURL = (
    chainId?: number,
    address?: string
): string | null => {
    if (!chainId || !address) return null;
    const prefix = TRUST_WALLET_CHAIN[chainId];
    if (!prefix) return null;
    return `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/${prefix}/assets/${address}/logo.png`;
};
