import { useEffect, useState } from "react";
import { useNetwork } from "wagmi";
import { isAddress, getAddress } from "@ethersproject/address";
import { ChainId } from "@carrot-kpi/sdk";

const DEFILLAMA_API_CHAIN_PREFIX: Record<ChainId, string> = {
    [ChainId.GNOSIS]: "xdai",
    [ChainId.SEPOLIA]: "",
    [ChainId.ARBITRUM_GOERLI]: "",
};

const FRESHNESS_THRESHOLD = "1h";
const CONFIDENCE_THRESHOLD = 0.8;

export const useERC20TokenPrice = (
    tokenAddress?: string
): { loading: boolean; price: number } => {
    const { chain } = useNetwork();

    const [loading, setLoading] = useState(false);
    const [price, setPrice] = useState(0);

    useEffect(() => {
        let cancelled = false;
        const fetchPrice = async () => {
            if (!tokenAddress || !isAddress(tokenAddress) || !chain) {
                setPrice(0);
                setLoading(false);
                return;
            }
            if (!cancelled) setLoading(true);
            try {
                const checksummedAddress = getAddress(tokenAddress);
                const keys = [`coingecko:${checksummedAddress}`];
                const apiChainPrefix =
                    DEFILLAMA_API_CHAIN_PREFIX[chain.id as ChainId];
                if (apiChainPrefix)
                    keys.push(`${apiChainPrefix}:${checksummedAddress}`);
                const response = await fetch(
                    `https://coins.llama.fi/prices/current/${keys.join(
                        ","
                    )}?searchWidth=${FRESHNESS_THRESHOLD}`
                );
                if (!response.ok) return;
                const body = (await response.json()) as {
                    coins: Record<
                        string,
                        { price: number; confidence: number }
                    >;
                };

                for (const key of keys) {
                    const wrappedPrice = body.coins[key];
                    if (
                        wrappedPrice &&
                        wrappedPrice.confidence > CONFIDENCE_THRESHOLD
                    ) {
                        if (!cancelled) setPrice(wrappedPrice.price);
                        return;
                    }
                }

                // only if no price is found we arrive here
                if (!cancelled) setPrice(0);
            } catch (error) {
                console.warn(
                    `error while fetching price of erc20 token at address ${tokenAddress}`,
                    error
                );
            } finally {
                if (!cancelled) setLoading(false);
            }
        };
        void fetchPrice();
        return () => {
            cancelled = true;
        };
    }, [chain, tokenAddress]);

    return { loading, price };
};
