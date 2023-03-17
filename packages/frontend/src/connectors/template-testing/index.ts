import { Address, Chain, ConnectorData, Signer } from "@wagmi/core";
import { providers, Wallet } from "ethers";
import { Connector } from "wagmi";

export const TEMPLATE_TESTING_CONNECTOR_ID = "template-testing";

export interface CarrotConnectorOptions {
    rpcURL: string;
    chainId: number;
    privateKey: string;
}

// a mocked connector to be used while developing templates
export class CarrotConnector extends Connector<
    providers.JsonRpcProvider,
    CarrotConnectorOptions,
    Signer
> {
    readonly id = TEMPLATE_TESTING_CONNECTOR_ID;
    readonly name = "Template testing";
    readonly ready = true;

    private readonly provider: providers.JsonRpcProvider;
    private readonly signer: Signer;

    constructor(config: { chains: Chain[]; options: CarrotConnectorOptions }) {
        super(config);
        this.provider = new providers.JsonRpcProvider(config.options.rpcURL);
        this.signer = new Wallet(config.options.privateKey).connect(
            this.provider
        );
    }

    async connect({} = {}): Promise<Required<ConnectorData>> {
        this.emit("message", { type: "connecting" });

        const data = {
            account: (await this.signer.getAddress()) as Address,
            chain: { id: this.options.chainId, unsupported: false },
            provider: this.provider,
        };

        return data;
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    async disconnect(): Promise<void> {}

    protected isChainUnsupported(chainId: number): boolean {
        return this.options.chainId !== chainId;
    }

    async getAccount(): Promise<Address> {
        return (await this.signer.getAddress()) as Address;
    }

    async getChainId(): Promise<number> {
        return this.options.chainId;
    }

    async getProvider({} = {}): Promise<providers.JsonRpcProvider> {
        return this.provider;
    }

    async getSigner(): Promise<Signer> {
        return this.signer;
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
