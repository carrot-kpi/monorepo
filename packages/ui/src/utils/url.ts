import { parseENSName, uriToHttps } from "@carrot-kpi/sdk";

export const resolveSrc = (
    src?: string | string[] | null,
    ipfsGatewayURL?: string | null,
    defaultSrc: string | string[] | null = [],
) => {
    if (!src && !!defaultSrc)
        return typeof defaultSrc === "string" ? [defaultSrc] : defaultSrc;
    if (typeof src === "string")
        return resolveSingleSrc(src, ipfsGatewayURL, defaultSrc);
    if (src instanceof Array)
        return src.reduce((accumulator: string[], src) => {
            return accumulator.concat(
                resolveSingleSrc(src, ipfsGatewayURL, defaultSrc),
            );
        }, []);
    return [];
};

const resolveSingleSrc = (
    src?: string | null,
    ipfsGatewayURL?: string | null,
    defaultSrc: string | string[] | null = [],
): string[] => {
    if (!src) return [];
    const resolvedDefaultSrcs = !!!defaultSrc
        ? []
        : typeof defaultSrc === "string"
          ? [defaultSrc]
          : defaultSrc;
    const parsedENSName = parseENSName(src);
    if (!!parsedENSName) {
        const { name, path } = parsedENSName;
        const lowerCaseName = name.toLowerCase();
        return resolvedDefaultSrcs.concat(
            `https://${lowerCaseName}.eth.limo/${path}`,
            `https://${lowerCaseName}.eth.link/${path}`,
        );
    }
    return resolvedDefaultSrcs.concat(
        uriToHttps(src, ipfsGatewayURL || undefined),
    );
};
