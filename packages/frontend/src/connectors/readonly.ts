import {
    createPublicClient,
    http,
    SwitchChainError,
    type PublicClient,
} from "viem";
import { ChainNotConfiguredError, createConnector } from "wagmi";
import { normalizeChainId } from "../utils/chain";

export const READONLY_CONNNECTOR_ID = "readonly";

export const readonly = () => {
    return createConnector((config) => {
        const clients: Record<number, PublicClient> = {};

        const getChainFromId = (chainId?: number) =>
            config.chains.find((chain) => chain.id === chainId) ||
            config.chains[0];

        return {
            id: READONLY_CONNNECTOR_ID,
            name: "Readonly",
            type: "readonly" as const,
            async connect(params) {
                return {
                    accounts: [],
                    chainId: getChainFromId(params?.chainId).id,
                };
            },
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            async disconnect() {},
            async getAccounts() {
                return [];
            },
            async getChainId() {
                return getChainFromId().id;
            },
            async getProvider() {
                return null;
            },
            async getClient(params) {
                const chain = getChainFromId(params?.chainId);
                if (!clients[chain.id]) {
                    const rpcUrl = chain?.rpcUrls.default.http?.[0];
                    if (!rpcUrl)
                        throw new Error(
                            `no rpc url for chain id ${params?.chainId}`,
                        );
                    clients[chain.id] = createPublicClient({
                        transport: http(rpcUrl),
                        chain,
                    });
                }
                return clients[chain.id];
            },
            async isAuthorized() {
                return true;
            },
            async switchChain({ chainId }) {
                await this.getProvider({ chainId });
                const chain = config.chains.find((x) => x.id === chainId);
                if (!chain)
                    throw new SwitchChainError(new ChainNotConfiguredError());
                config.emitter.emit("change", {
                    chainId: normalizeChainId(chainId),
                });
                return chain;
            },
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            onAccountsChanged() {},
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            onChainChanged() {},
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            onDisconnect() {},
        };
    });
};
