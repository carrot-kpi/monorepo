import type { Address, Chain, ConnectorData, WalletClient } from "wagmi";
import { Connector, ConnectorNotFoundError } from "wagmi";
import type Provider from "ethereum-provider";
import {
    ProviderRpcError,
    SwitchChainError,
    UserRejectedRequestError,
    createWalletClient,
    custom,
    getAddress,
    numberToHex,
} from "viem";
import { normalizeChainId } from "../../utils/chain";
import getProvider from "eth-provider";

export const FRAME_CONNECTOR_ID = "frame";

export class FrameConnector extends Connector<Provider, unknown> {
    readonly id = FRAME_CONNECTOR_ID;
    readonly name = "Frame";
    ready: boolean;

    private provider?: Provider;

    constructor(config: { chains: Chain[] }) {
        super({ ...config, options: {} });
        this.ready = false;

        fetch("http://127.0.0.1:1248", {
            method: "POST",
            body: JSON.stringify({
                jsonrpc: "2.0",
                method: "eth_blockNumber",
                params: [],
                id: 1,
            }),
        })
            .then((response) => {
                this.ready = response.ok;
            })
            .catch((error) => {
                console.warn(
                    "error while checking if frame is available",
                    error,
                );
                this.ready = false;
            });
    }

    public async connect({ chainId }: { chainId?: number } = {}): Promise<
        Required<ConnectorData>
    > {
        const provider = await this.getProvider();
        if (!provider) throw new ConnectorNotFoundError();

        if (provider.on) {
            provider.on("accountsChanged", this.onAccountsChanged);
            provider.on("chainChanged", this.onChainChanged);
            provider.on("disconnect", this.onDisconnect);
        }

        this.emit("message", { type: "connecting" });

        const account = getAddress(provider.accounts[0] as string);
        // Switch to chain if provided
        let id = await this.getChainId();
        let unsupported = this.isChainUnsupported(id);
        if (chainId && id !== chainId) {
            const chain = await this.switchChain(chainId);
            id = chain.id;
            unsupported = this.isChainUnsupported(id);
        }

        return { account, chain: { id, unsupported } };
    }

    public async disconnect() {
        const provider = await this.getProvider();

        provider.removeListener("accountsChanged", this.onAccountsChanged);
        provider.removeListener("chainChanged", this.onChainChanged);
        provider.removeListener("disconnect", this.onDisconnect);
    }

    public async getAccount(): Promise<Address> {
        const provider = await this.getProvider();
        return getAddress(provider.accounts[0]);
    }

    public async getChainId() {
        const provider = await this.getProvider();
        if (!provider.chainId) throw new Error("no chain id in provider");
        return normalizeChainId(provider.chainId);
    }

    public async getProvider(): Promise<Provider> {
        if (!this.provider) {
            this.provider = getProvider("frame");
            this.provider.accounts = await this.provider.request({
                method: "eth_requestAccounts",
                params: [],
            });
            this.provider.on("accountsChanged", this.onAccountsChanged);
            this.provider.on("chainChanged", this.onChainChanged);
            this.provider.on("disconnect", this.onDisconnect);
        }
        return this.provider;
    }

    async getWalletClient({
        chainId,
    }: { chainId?: number } = {}): Promise<WalletClient> {
        const [provider, account] = await Promise.all([
            this.getProvider(),
            this.getAccount(),
        ]);
        const chain = this.chains.find((x) => x.id === chainId);
        if (!provider) throw new Error("provider is required.");
        return createWalletClient({
            account,
            chain,
            transport: custom(provider),
        });
    }

    async isAuthorized() {
        try {
            return !!((await this.getProvider()) && (await this.getAccount()));
        } catch {
            return false;
        }
    }

    async switchChain(chainId: number): Promise<Chain> {
        const provider = await this.getProvider();
        if (!provider) throw new ConnectorNotFoundError();
        const targetChain = this.chains.find((chain) => chain.id === chainId);
        if (!targetChain)
            throw new Error(`chain with id ${chainId} is not supported`);
        const hexChainId = numberToHex(chainId);

        try {
            await provider.request({
                method: "wallet_switchEthereumChain",
                params: [{ chainId: hexChainId }],
            });
            await new Promise<void>((resolve) =>
                this.on("change", ({ chain }) => {
                    if (chain?.id === chainId) resolve();
                }),
            );
            return targetChain;
        } catch (error) {
            // Indicates chain is not added to provider
            if ((error as ProviderRpcError).code === 4902) {
                try {
                    await provider.request({
                        method: "wallet_addEthereumChain",
                        params: [
                            {
                                chainId: hexChainId,
                                chainName: targetChain.name,
                                nativeCurrency: targetChain.nativeCurrency,
                                rpcUrls: [
                                    targetChain.rpcUrls.public?.http[0] ?? "",
                                ],
                                blockExplorerUrls:
                                    this.getBlockExplorerUrls(targetChain),
                            },
                        ],
                    });

                    const currentChainId = await this.getChainId();
                    if (currentChainId !== targetChain.id)
                        throw new UserRejectedRequestError(
                            new Error(
                                "User rejected switch after adding network.",
                            ),
                        );

                    return targetChain;
                } catch (error) {
                    throw new UserRejectedRequestError(error as Error);
                }
            }

            if (this.isUserRejectedRequestError(error))
                throw new UserRejectedRequestError(error as Error);
            throw new SwitchChainError(error as Error);
        }
    }

    protected isUserRejectedRequestError(error: unknown) {
        return (error as ProviderRpcError).code === 4001;
    }

    protected onAccountsChanged = (accounts: string[]): void => {
        if (accounts.length === 0) this.emit("disconnect");
        else
            this.emit("change", {
                account: getAddress(accounts[0] as string),
            });
    };

    protected onChainChanged = (chainId: number | string): void => {
        const id = normalizeChainId(chainId);
        const unsupported = this.isChainUnsupported(id);
        this.emit("change", { chain: { id, unsupported } });
    };

    protected onDisconnect = (): void => {
        this.emit("disconnect");
    };
}
