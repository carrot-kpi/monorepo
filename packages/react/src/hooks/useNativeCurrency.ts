import { Currency } from "@carrot-kpi/sdk";
import { useNetwork, chain as wagmiChain } from "wagmi";

export function useNativeCurrency(): Currency {
    const { chain } = useNetwork();
    // fallback to ether if chain id is not defined
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    if (!chain) return wagmiChain.mainnet.nativeCurrency!;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return chain.nativeCurrency!;
}
