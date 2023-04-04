const ITEMS_PER_PAGE = 1;

export const usePagination = <T>(
    data: T[],
    currentPage: number,
    totalItems?: number
) => {
    const itemsPerPage = totalItems ? totalItems : ITEMS_PER_PAGE;

    const startIndex =
        currentPage === 1 ? currentPage : (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const slicedData =
        data.length > itemsPerPage ? data.slice(startIndex, endIndex) : data;
    const totalPages = Math.ceil(data.length / itemsPerPage);

    return { data: slicedData, totalPages };
};
