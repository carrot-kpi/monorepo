import { Currency } from "@carrot-kpi/sdk/lib/entities/currency";
import { useNetwork } from "wagmi";
import { mainnet } from "wagmi/chains";

export function useNativeCurrency(): Currency {
    const { chain } = useNetwork();
    // fallback to ether if chain id is not defined
    if (!chain) return mainnet.nativeCurrency;
    return chain.nativeCurrency;
}
