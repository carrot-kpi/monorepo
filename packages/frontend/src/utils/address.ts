export const shortenAddress = (address?: string) => {
    return address
        ? `${address.slice(0, 6)}...${address.substring(38)}`
        : undefined;
};
