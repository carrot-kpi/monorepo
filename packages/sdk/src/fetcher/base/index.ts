import { Provider } from "@ethersproject/providers";

export class BaseFetcher {
    provider;

    constructor(provider: Provider) {
        this.provider = provider;
    }
}
