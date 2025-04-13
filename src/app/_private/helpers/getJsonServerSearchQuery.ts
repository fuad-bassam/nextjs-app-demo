import { IPaginationInfo } from "../models/Common/Pagination";

export const getJsonServerQuerySearchPart = <T extends Record<string, any>>(formData: T): string => {
    const filteredData = Object.fromEntries(
        Object.entries(formData)
            .filter(([, value]) => value !== '' && value !== null && value !== "0" && value !== 0)
            .map(([key, value]) => [`${key}_like`, value]) // Append `_like` for JSON Server filtering
    );

    return new URLSearchParams(filteredData).toString();
};

export const getJsonServerQueryBuildWithFormData = (paginationInfo: IPaginationInfo, formData: any): string =>
    `?${getJsonServerQuerySearchPart(formData) || ''}${paginationInfo.currentPage ? `&_page=${paginationInfo.currentPage}` : ''}${paginationInfo.rowsPerPage ? `&_limit=${paginationInfo.rowsPerPage}` : ''}${paginationInfo.sortBy ? `&_sort=${paginationInfo.sortBy}&_order=${paginationInfo.sortOrder}` : ''}`;

export const getJsonServerQueryBuildWithStringQuery = (paginationInfo: IPaginationInfo, stringQuery: string): string =>
    `?${stringQuery ? stringQuery : ''}${paginationInfo.currentPage ? `&_page=${paginationInfo.currentPage}` : ''}${paginationInfo.rowsPerPage ? `&_limit=${paginationInfo.rowsPerPage}` : ''}${paginationInfo.sortBy ? `&_sort=${paginationInfo.sortBy}&_order=${paginationInfo.sortOrder}` : ''}`;
