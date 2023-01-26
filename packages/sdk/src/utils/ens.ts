export const ENS_NAME_REGEX = /^(([a-zA-Z0-9]+\.)+)eth(\/.*)?$/;

export const parseENSName = (
    ensAddress: string
): { name: string; path?: string } | null => {
    const match = ensAddress.match(ENS_NAME_REGEX);
    if (!match) return null;
    return { name: `${match[1].toLowerCase()}eth`, path: match[3] };
};
