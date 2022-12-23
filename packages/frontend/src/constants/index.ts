import { ChainId } from "@carrot-kpi/sdk";
import { FunctionComponent, SVGProps } from "react";
import { goerli, sepolia } from "wagmi/chains";
import { Chain } from "wagmi/chains";
import { ReactComponent as EthereumLogo } from "../assets/chains/ethereum.svg";

export const CARROT_KPI_FRONTEND_I18N_NAMESPACE = "@carrot-kpi/frontend";

interface AugmentedChain extends Chain {
    logo: FunctionComponent<SVGProps<SVGSVGElement>>;
    iconBackgroundColor: string;
}

export const SUPPORTED_CHAINS: Record<ChainId, AugmentedChain> = {
    [ChainId.SEPOLIA]: {
        ...sepolia,
        logo: EthereumLogo,
        iconBackgroundColor: "#8637ea",
    },
    [ChainId.GOERLI]: {
        ...goerli,
        logo: EthereumLogo,
        iconBackgroundColor: "#3099f2",
    },
};
