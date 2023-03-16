import { JsonRpcProvider } from "@ethersproject/providers";
import { Connector } from "wagmi";
import { Address, Chain, ConnectorData, normalizeChainId } from "@wagmi/core";

export const FRAME_CONNECTOR_ID = "frame";

export class FrameConnector extends Connector<JsonRpcProvider, unknown> {
    readonly id = FRAME_CONNECTOR_ID;
    readonly name = "Frame";
    readonly ready = true;

    private provider?: JsonRpcProvider;

    constructor(config: { chains: Chain[]; options: object }) {
        super(config);
    }

    public async connect({ chainId }: { chainId?: number } = {}): Promise<
        Required<ConnectorData>
    > {
        let targetChainId = chainId;
        let useDefaultChainId = false;
        if (!targetChainId || this.isChainUnsupported(targetChainId)) {
            try {
                const lastUsedChainId = await this.getChainId();
                if (
                    lastUsedChainId &&
                    !this.isChainUnsupported(lastUsedChainId)
                ) {
                    targetChainId = lastUsedChainId;
                } else {
                    useDefaultChainId = true;
                }
            } catch (e) {
                useDefaultChainId = true;
            }
        }

        const provider = await this.getProvider({
            chainId: targetChainId,
            create: true,
        });
        provider.on("accountsChanged", this.onAccountsChanged);
        provider.on("chainChanged", this.onChainChanged);
        provider.on("disconnect", this.onDisconnect);

        const id = useDefaultChainId
            ? this.chains[0].id
            : await this.getChainId();

        const unsupported = this.isChainUnsupported(id);

        const signer = await provider.getSigner();
        return {
            account: (await signer.getAddress()) as Address,
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

    public async getAccount(): Promise<Address> {
        const provider = await this.getProvider();
        const signer = await provider.getSigner();
        return (await signer.getAddress()) as Address;
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
            this.provider = new JsonRpcProvider(
                "http://127.0.0.1:1248",
                chainId
            );
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
        this.onChainChanged(chainId);
        const chain = this.chains.find((x) => x.id === chainId);
        if (!chain)
            throw new Error(`can't find switched chain with id ${chainId}`);
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
