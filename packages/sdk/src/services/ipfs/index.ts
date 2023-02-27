import { CACHER } from "../../commons";

export const DEFAULT_IPFS_GATEWAY = "https://carrot-kpi.dev";

export class IPFSService {
    static readonly IPFS_GATEWAY_KEY = "ipfs-gateway";

    static set gateway(ipfsGateway: string) {
        ipfsGateway = ipfsGateway.endsWith("/")
            ? ipfsGateway.slice(0, ipfsGateway.length - 1)
            : ipfsGateway;
        CACHER.set(this.IPFS_GATEWAY_KEY, ipfsGateway, Number.MAX_SAFE_INTEGER);
    }

    static get gateway() {
        return CACHER.getOrDefault<string>(
            this.IPFS_GATEWAY_KEY,
            DEFAULT_IPFS_GATEWAY
        );
    }
}
