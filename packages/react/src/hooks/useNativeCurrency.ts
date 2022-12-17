import { Currency } from "@carrot-kpi/sdk";
import { useNetwork } from "wagmi";
import { mainnet } from "wagmi/chains";

export function useNativeCurrency(): Currency {
    const { chain } = useNetwork();
    // fallback to ether if chain id is not defined
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    if (!chain) return mainnet.nativeCurrency!;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return chain.nativeCurrency!;
}
