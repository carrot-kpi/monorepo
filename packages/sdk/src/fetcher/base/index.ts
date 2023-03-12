import { Provider } from "@ethersproject/providers";
import { ChainId, CHAIN_ADDRESSES, SUBGRAPH_URL } from "../../commons";
import { enforce } from "../../utils";

export class BaseFetcher {
    provider;
    ipfsGatewayURL;

    constructor(provider: Provider, ipfsGatewayURL: string) {
        this.provider = provider;
        this.ipfsGatewayURL = ipfsGatewayURL;
    }

    public async getChainId() {
        const { chainId } = await this.provider.getNetwork();
        enforce(chainId in ChainId, `unsupported chain with id ${chainId}`);
        return { chainId };
    }

    public async getSubgraphURL(chainId: ChainId) {
        const subgraphURL = SUBGRAPH_URL[chainId as ChainId];
        enforce(!!subgraphURL, `no subgraph available in chain ${chainId}`);
        return { subgraphURL };
    }

    public async getChainIdAndSubgraphURL() {
        const { chainId } = await this.getChainId();
        const { subgraphURL } = await this.getSubgraphURL(chainId);
        return { chainId, subgraphURL };
    }

    public async getChainIdAndChainAddresses() {
        const { chainId } = await this.getChainId();
        const chainAddresses = CHAIN_ADDRESSES[chainId as ChainId];
        enforce(!!chainAddresses, `no addresses available in chain ${chainId}`);
        return { chainId, chainAddresses };
    }

    public async getChainAddresses(chainId: ChainId) {
        const chainAddresses = CHAIN_ADDRESSES[chainId as ChainId];
        enforce(!!chainAddresses, `no addresses available in chain ${chainId}`);
        return { chainAddresses };
    }

    public async getChainIdSubgraphAndChainAddresses() {
        const { chainId, subgraphURL } = await this.getChainIdAndSubgraphURL();
        const chainAddresses = CHAIN_ADDRESSES[chainId as ChainId];
        enforce(!!chainAddresses, `no addresses available in chain ${chainId}`);
        return { chainId, subgraphURL, chainAddresses };
    }
}
