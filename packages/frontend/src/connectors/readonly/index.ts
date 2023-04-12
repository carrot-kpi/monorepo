import { JsonRpcProvider } from "@ethersproject/providers";
import { Connector } from "wagmi";
import { Address, Chain, ConnectorData, normalizeChainId } from "@wagmi/core";
import { constants } from "ethers";

export const READ_ONLY_CONNECTOR_ID = "readonly";
const DEFAULT_CHAIN_ID = 100; // gnosis

export type InjectedConnectorOptions = {
    /** Name of connector */
    name?: string | ((detectedName: string | string[]) => string);
};

const getChainIdFromlocalStorage = () => {
    const wagmiStore = localStorage.getItem("wagmi.store");
    if (!wagmiStore) return DEFAULT_CHAIN_ID;
    const parsedStore = JSON.parse(wagmiStore);

    if (
        parsedStore.state &&
        parsedStore.state.data &&
        parsedStore.state.data.chain &&
        parsedStore.state.data.chain.id
    ) {
        return parsedStore.state.data.chain.id;
    }

    return DEFAULT_CHAIN_ID;
};

export class ReadonlyConnector extends Connector<
    JsonRpcProvider,
    InjectedConnectorOptions
> {
    readonly id = READ_ONLY_CONNECTOR_ID;
    readonly name = "Readonly";
    readonly ready = true;

    private provider?: JsonRpcProvider;

    constructor(config: { chains: Chain[]; options: object }) {
        super(config);
    }

    public async connect({ chainId }: { chainId?: number } = {}): Promise<
        Required<ConnectorData>
    > {
        let targetChainId = chainId;
        if (!targetChainId || this.isChainUnsupported(targetChainId)) {
            const lastUsedChainId = getChainIdFromlocalStorage();
            if (lastUsedChainId && !this.isChainUnsupported(lastUsedChainId)) {
                targetChainId = lastUsedChainId;
            }
        }

        const provider = await this.getProvider({
            chainId: targetChainId,
            create: true,
        });
        provider.on("accountsChanged", this.onAccountsChanged);
        provider.on("chainChanged", this.onChainChanged);
        provider.on("disconnect", this.onDisconnect);

        const id = targetChainId || getChainIdFromlocalStorage();

        const unsupported = this.isChainUnsupported(id);

        return {
            account: undefined as unknown as Address,
            chain: { id, unsupported },
            provider,
        };
    }

    public async disconnect() {
        const provider = await this.getProvider();

        provider.removeListener("accountsChanged", this.onAccountsChanged);
        provider.removeListener("chainChanged", this.onChainChanged);
        provider.removeListener("disconnect", this.onDisconnect);
    }

    public async getAccount(): Promise<`0x${string}`> {
        return constants.AddressZero;
    }

    public async getChainId() {
        const provider = await this.getProvider();
        const network = await provider.getNetwork();
        const chainId = normalizeChainId(network.chainId);

        return chainId;
    }

    public async getProvider({
        chainId,
        create,
    }: { chainId?: number; create?: boolean } = {}) {
        if (!this.provider || chainId || create) {
            const rpcUrl = this.chains.find((chain) => chain.id === chainId)
                ?.rpcUrls.default.http;
            this.provider = new JsonRpcProvider(rpcUrl?.[0], chainId);
        }
        return this.provider;
    }

    async getSigner() {
        const provider = await this.getProvider();
        return provider.getSigner();
    }

    async isAuthorized() {
        return true;
    }

    async switchChain(chainId: number): Promise<Chain> {
        await this.getProvider({ chainId, create: true });
        const chain = this.chains.find((x) => x.id === chainId);
        if (!chain)
            throw new Error(`can't find switched chain with id ${chainId}`);
        this.onChainChanged(chainId);
        return chain;
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    protected onAccountsChanged = (): void => {};

    protected onChainChanged = (chainId: number | string): void => {
        const id = normalizeChainId(chainId);
        const unsupported = this.isChainUnsupported(id);
        this.emit("change", { chain: { id, unsupported } });
    };

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    protected onDisconnect = (): void => {};
}
