export enum Service {
    STATIC_CDN,
    IPFS_GATEWAY,
    DATA_UPLOADER,
}

export interface ServiceURLs {
    staging: string;
    prod: string;
}

const SERVICE_URLS: Record<Service, ServiceURLs> = {
    [Service.STATIC_CDN]: {
        staging: "https://static.staging.carrot.community",
        prod: "https://static.carrot.community",
    },
    [Service.IPFS_GATEWAY]: {
        staging: "https://gateway.api.staging.carrot.community",
        prod: "https://gateway.api.carrot.community",
    },
    [Service.DATA_UPLOADER]: {
        staging: "https://data-uploader.api.staging.carrot.community",
        prod: "https://data-uploader.api.carrot.community",
    },
};

export const getServiceURL = (service: Service, prod: boolean): string => {
    const base = SERVICE_URLS[service];
    return prod ? base.prod : base.staging;
};
