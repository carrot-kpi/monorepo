import { type Hex, createPublicClient, createWalletClient, http } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import type {
    Address,
    Chain,
    ConnectorData,
    PublicClient,
    WalletClient,
} from "wagmi";
import { Connector } from "wagmi";

export const TEMPLATE_TESTING_CONNECTOR_ID = "template-testing";

export interface CarrotConnectorOptions {
    rpcURL: string;
    privateKey: Hex;
}

// a mocked connector to be used while developing templates
export class CarrotConnector extends Connector<
    PublicClient,
    CarrotConnectorOptions
> {
    readonly id = TEMPLATE_TESTING_CONNECTOR_ID;
    readonly name = "Template testing";
    readonly ready = true;

    private provider?: PublicClient;
    private walletClient?: WalletClient;

    constructor(config: { chains: Chain[]; options: CarrotConnectorOptions }) {
        super(config);
    }

    async connect({} = {}): Promise<Required<ConnectorData>> {
        return {
            account: await this.getAccount(),
            chain: { id: await this.getChainId(), unsupported: false },
        };
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    async disconnect(): Promise<void> {}

    protected isChainUnsupported(chainId: number): boolean {
        return this.chains[0].id !== chainId;
    }

    async getAccount(): Promise<Address> {
        return (await this.getWalletClient()).account.address;
    }

    async getChainId(): Promise<number> {
        return this.chains[0].id;
    }

    async getProvider({} = {}): Promise<PublicClient> {
        if (!this.provider)
            this.provider = createPublicClient({
                transport: http(this.options.rpcURL),
                chain: this.chains[0],
            });
        return this.provider;
    }

    async getWalletClient(): Promise<WalletClient> {
        if (!this.walletClient) {
            const account = privateKeyToAccount(this.options.privateKey);
            this.walletClient = createWalletClient({
                account,
                transport: http(this.options.rpcURL),
            });
        }
        return this.walletClient;
    }

    async isAuthorized(): Promise<boolean> {
        return true;
    }

    async watchAsset({} = {}): Promise<boolean> {
        return false;
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    protected onAccountsChanged = (): void => {};

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    protected onChainChanged = (): void => {};

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    protected onDisconnect = (): void => {};
}
