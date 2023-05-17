import { createPublicClient, createWalletClient, http } from "viem";
import type {
    Address,
    Chain,
    ConnectorData,
    PublicClient,
    WalletClient,
    Connector,
} from "wagmi";
import { zeroAddress } from "viem";
import { normalizeChainId } from "../../utils/chain";
import { DEFAULT_CHAIN } from "../../constants";

export const READ_ONLY_CONNECTOR_ID = "readonly";

export class ReadonlyConnector extends Connector<PublicClient> {
    readonly id = READ_ONLY_CONNECTOR_ID;
    readonly name = "Readonly";
    readonly ready = true;

    private provider?: PublicClient;

    constructor(config: { chains: Chain[] }) {
        super({ chains: config.chains, options: {} });
    }

    public async connect({ chainId }: { chainId?: number } = {}): Promise<
        Required<ConnectorData>
    > {
        const id = chainId || this.chains[0].id;
        const unsupported = this.isChainUnsupported(id);
        return {
            account: undefined as unknown as Address,
            chain: { id, unsupported },
        };
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    public async disconnect() {}

    public async getAccount(): Promise<`0x${string}`> {
        return zeroAddress;
    }

    public async getChainId() {
        const provider = await this.getProvider();
        return provider.getChainId();
    }

    public async getProvider(config?: {
        chainId?: number;
    }): Promise<PublicClient> {
        if (!this.provider) {
            const chain =
                this.chains.find((chain) => chain.id === config?.chainId) ||
                DEFAULT_CHAIN;
            const rpcUrl = chain?.rpcUrls.default.http?.[0];
            if (!rpcUrl)
                throw new Error(`no rpc url for chain id ${config?.chainId}`);
            this.provider = createPublicClient({
                transport: http(rpcUrl),
                chain,
            });
        }
        return this.provider;
    }

    async getWalletClient(config?: {
        chainId?: number;
    }): Promise<WalletClient> {
        const chain = this.chains.find((chain) => chain.id === config?.chainId);
        if (!chain) throw new Error(`unsupported chain id ${config?.chainId}`);
        const rpcUrl = chain?.rpcUrls.default.http?.[0];
        if (!chain)
            throw new Error(`no rpc url for chain id ${config?.chainId}`);
        return createWalletClient({
            transport: http(rpcUrl),
            chain,
            account: zeroAddress,
        });
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
