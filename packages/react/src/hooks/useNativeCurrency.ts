import { Currency } from "@carrot-kpi/sdk";
import { useAccount } from "wagmi";
import { mainnet } from "wagmi/chains";

export function useNativeCurrency(): Currency {
    const { chain } = useAccount();
    // fallback to ether if chain id is not defined
    if (!chain) return mainnet.nativeCurrency;
    return chain.nativeCurrency;
}
