export const getTransactionExplorerLink = (url: string | undefined) => {
    if (!url) return "";
    if (url[url.length - 1] === "/") return url.substring(0, url.length - 1);
    return url;
};
