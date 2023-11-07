import { useEffect, useState } from "react";
import { useNetwork } from "wagmi";
import { isAddress, getAddress } from "viem";
import { ChainId } from "@carrot-kpi/sdk";

const DEFILLAMA_API_CHAIN_PREFIX: Record<ChainId, string> = {
    [ChainId.GNOSIS]: "xdai",
    [ChainId.SEPOLIA]: "",
    [ChainId.SCROLL_SEPOLIA]: "",
    [ChainId.POLYGON_MUMBAI]: "",
};

const FRESHNESS_THRESHOLD = "1h";
const CONFIDENCE_THRESHOLD = 0.8;

interface ERC20TokenPriceParams {
    tokenAddress?: string;
}

export const useERC20TokenPrice = (
    params?: ERC20TokenPriceParams,
): { loading: boolean; price: number } => {
    const { chain } = useNetwork();

    const [loading, setLoading] = useState(false);
    const [price, setPrice] = useState(0);

    useEffect(() => {
        let cancelled = false;
        const fetchPrice = async () => {
            if (
                !params?.tokenAddress ||
                !isAddress(params.tokenAddress) ||
                !chain
            ) {
                setPrice(0);
                setLoading(false);
                return;
            }
            if (!cancelled) setLoading(true);
            try {
                const checksummedAddress = getAddress(params.tokenAddress);
                const keys = [`coingecko:${checksummedAddress}`];
                const apiChainPrefix =
                    DEFILLAMA_API_CHAIN_PREFIX[chain.id as ChainId];
                if (apiChainPrefix)
                    keys.push(`${apiChainPrefix}:${checksummedAddress}`);
                const response = await fetch(
                    `https://coins.llama.fi/prices/current/${keys.join(
                        ",",
                    )}?searchWidth=${FRESHNESS_THRESHOLD}`,
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
                    `error while fetching price of erc20 token at address ${params.tokenAddress}`,
                    error,
                );
            } finally {
                if (!cancelled) setLoading(false);
            }
        };
        void fetchPrice();
        return () => {
            cancelled = true;
        };
    }, [chain, params?.tokenAddress]);

    return { loading, price };
};
