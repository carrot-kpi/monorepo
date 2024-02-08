import { type Hex, createWalletClient, http } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { createConnector } from "wagmi";

export const TEMPLATES_TESTING_CONNECTOR_ID = "templates-testing";

export interface TemplatesTestingConnectorParams {
    rpcURL: string;
    privateKey: Hex;
}

export const templatesTesting = ({
    rpcURL,
    privateKey,
}: TemplatesTestingConnectorParams) => {
    return createConnector((config) => {
        const account = privateKeyToAccount(privateKey);
        const client = createWalletClient({
            account,
            transport: http(rpcURL),
            chain: config.chains[0],
        });

        return {
            id: TEMPLATES_TESTING_CONNECTOR_ID,
            name: "Templates testing",
            type: "templates-testing" as const,
            async connect() {
                return {
                    accounts: [account.address],
                    chainId: await this.getChainId(),
                };
            },
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            async disconnect() {},
            async getAccounts() {
                return [account.address];
            },
            async getChainId() {
                return client.chain.id;
            },
            async getProvider() {
                return null;
            },
            async getClient() {
                return client;
            },
            async isAuthorized() {
                return true;
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
