import { JsonRpcProvider } from "@ethersproject/providers";
import { Connector } from "wagmi";
import { Address, Chain, ConnectorData, normalizeChainId } from "@wagmi/core";
import { constants } from "ethers";

export const READ_ONLY_CONNECTOR_ID = "readonly";

export type InjectedConnectorOptions = {
    /** Name of connector */
    name?: string | ((detectedName: string | string[]) => string);
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
        const provider = await this.getProvider({ chainId });
        const id = chainId || this.chains[0].id;
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

    public async getProvider(config?: { chainId?: number }) {
        if (!this.provider) {
            const rpcUrl = this.chains.find(
                (chain) => chain.id === config?.chainId
            )?.rpcUrls.default.http;
            this.provider = new JsonRpcProvider(rpcUrl?.[0], config?.chainId);
            this.provider.on("accountsChanged", this.onAccountsChanged);
            this.provider.on("chainChanged", this.onChainChanged);
            this.provider.on("disconnect", this.onDisconnect);
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
        await this.getProvider({ chainId });
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
