export const uriToHttps = (
    uri: string,
    ipfsGatewayURL?: string | null,
): string[] => {
    const protocol = uri.split(":")[0].toLowerCase();
    switch (protocol) {
        case "https":
            return [uri];
        case "http":
            return ["https" + uri.substring(4), uri];
        case "ipfs": {
            if (!ipfsGatewayURL) return [];
            const cid = uri.match(/^ipfs:(\/\/)?(.*)$/i)?.[2];
            return [`${ipfsGatewayURL}/ipfs/${cid}`];
        }
        case "ipns": {
            if (!ipfsGatewayURL) return [];
            const name = uri.match(/^ipns:(\/\/)?(.*)$/i)?.[2];
            return [
                `${ipfsGatewayURL}/ipns/${name}`,
                `https://ipfs.io/ipns/${name}`,
            ];
        }
        default:
            return [];
    }
};
