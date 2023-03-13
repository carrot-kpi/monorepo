import { Provider } from "@ethersproject/providers";
import { ChainId, CHAIN_ADDRESSES, SUBGRAPH_URL } from "../../commons";
import { enforce } from "../../utils";

export interface FetcherBaseProps {
    provider: Provider;
    ipfsGatewayURL?: string;
    preferDecentralization?: boolean;
}

export class BaseFetcher {
    provider;
    ipfsGatewayURL;

    constructor({ provider, ipfsGatewayURL }: FetcherBaseProps) {
        this.provider = provider;
        this.ipfsGatewayURL = ipfsGatewayURL;
    }

    public async getChainId() {
        const { chainId } = await this.provider.getNetwork();
        enforce(chainId in ChainId, `unsupported chain with id ${chainId}`);
        return chainId;
    }

    public async getSubgraphURL(chainId?: ChainId) {
        if (!chainId) {
            chainId = await this.getChainId();
        }
        const subgraphURL = SUBGRAPH_URL[chainId];
        enforce(!!subgraphURL, `no subgraph available in chain ${chainId}`);
        return { subgraphURL };
    }

    public async getChainAddresses(chainId?: ChainId) {
        if (!chainId) {
            chainId = await this.getChainId();
        }
        const chainAddresses = CHAIN_ADDRESSES[chainId];
        enforce(!!chainAddresses, `no addresses available in chain ${chainId}`);
        return { chainAddresses };
    }
}
