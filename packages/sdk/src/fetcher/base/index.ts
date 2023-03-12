import { Provider } from "@ethersproject/providers";

export class BaseFetcher {
    provider;
    ipfsGatewayURL;

    constructor(provider: Provider, ipfsGatewayURL: string) {
        this.provider = provider;
        this.ipfsGatewayURL = ipfsGatewayURL;
    }
}
