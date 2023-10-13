const ITEMS_PER_PAGE = 18 as const;

interface PaginationParams<T> {
    data: T[];
    page: number;
    size?: number;
}

export const usePagination = <T>(params: PaginationParams<T>) => {
    const { data, page, size } = params;

    const pageSize = size ? size : ITEMS_PER_PAGE;
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const pageData =
        data.length > pageSize ? data.slice(startIndex, endIndex) : data;
    const totalPages = Math.ceil(data.length / pageSize);

    return { data: pageData, totalPages };
};
