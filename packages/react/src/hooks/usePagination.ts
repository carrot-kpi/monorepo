const ITEMS_PER_PAGE = 18;

interface PaginationParams<T> {
    data: T[];
    currentPage: number;
    totalItems?: number;
}

export const usePagination = <T>(params: PaginationParams<T>) => {
    const { data, currentPage, totalItems } = params;
    const itemsPerPage = totalItems ? totalItems : ITEMS_PER_PAGE;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const slicedData =
        data.length > itemsPerPage ? data.slice(startIndex, endIndex) : data;
    const totalPages = Math.ceil(data.length / itemsPerPage);

    return { data: slicedData, totalPages };
};
