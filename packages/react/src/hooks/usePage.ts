export const usePage = <T>(
    dataset: T[],
    itemsPerPage: number,
    page: number
): T[] => {
    const zeroIndexPage = page - 1;
    const pageOffset = Math.max(zeroIndexPage * itemsPerPage, 0);
    return dataset.slice(pageOffset, pageOffset + itemsPerPage);
};
