const ENS_NAME_REGEX = /^(([a-zA-Z0-9]+\.)+)eth(\/.*)?$/;

export const resolveSrc = (
    src?: string | string[] | null,
    ipfsGatewayURL?: string | null,
    defaultSrc: string | string[] | null = []
) => {
    if (!src && !!defaultSrc)
        return typeof defaultSrc === "string" ? [defaultSrc] : defaultSrc;
    if (typeof src === "string")
        return resolveSingleSrc(src, ipfsGatewayURL, defaultSrc);
    if (src instanceof Array)
        return src.reduce((accumulator: string[], src) => {
            return accumulator.concat(
                resolveSingleSrc(src, ipfsGatewayURL, defaultSrc)
            );
        }, []);
    return [];
};

const resolveSingleSrc = (
    src?: string | null,
    ipfsGatewayURL?: string | null,
    defaultSrc: string | string[] | null = []
): string[] => {
    if (!src) return [];
    const resolvedDefaultSrcs = !!!defaultSrc
        ? []
        : typeof defaultSrc === "string"
        ? [defaultSrc]
        : defaultSrc;
    const match = src.match(ENS_NAME_REGEX);
    if (!!match) {
        const name = match[1].toLowerCase();
        const path = match[3];
        return resolvedDefaultSrcs.concat(
            `https://${name}.eth.limo/${path}`,
            `https://${name}.eth.link/${path}`
        );
    }
    const protocol = src.split(":")[0].toLowerCase();
    switch (protocol) {
        case "https":
            return resolvedDefaultSrcs.concat(src);
        case "http":
            return resolvedDefaultSrcs.concat("https" + src.substring(4), src);
        case "ipfs": {
            if (!ipfsGatewayURL) return [];
            const cid = src.match(/^ipfs:(\/\/)?(.*)$/i)?.[2];
            return resolvedDefaultSrcs.concat(`${ipfsGatewayURL}/ipfs/${cid}`);
        }
        case "ipns": {
            if (!ipfsGatewayURL) return [];
            const name = src.match(/^ipns:(\/\/)?(.*)$/i)?.[2];
            return resolvedDefaultSrcs.concat(
                `${ipfsGatewayURL}/ipns/${name}`,
                `https://ipfs.io/ipns/${name}`
            );
        }
        default:
            return [];
    }
};
