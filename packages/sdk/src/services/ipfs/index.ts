import { CACHER } from "../../commons";

export const DEFAULT_IPFS_GATEWAY = "https://ipfs.io/ipfs/";

export class IpfsService {
    static readonly IPFS_GATEWAY_KEY = "ipfs-gateway";

    static set gateway(ipfsGateway: string) {
        ipfsGateway = ipfsGateway.endsWith("/")
            ? ipfsGateway
            : `${ipfsGateway}/`;
        CACHER.set(this.IPFS_GATEWAY_KEY, ipfsGateway, Number.MAX_SAFE_INTEGER);
    }

    static get gateway() {
        return CACHER.getOrDefault<string>(
            this.IPFS_GATEWAY_KEY,
            DEFAULT_IPFS_GATEWAY
        );
    }
}
