export interface IPaginationInfo {
    currentPage: number;
    rowsPerPage: number;
    sortBy?: string | null;
    sortOrder?: "asc" | "desc" | null;
}
export interface IPaginationInfoNew {
    currentPage?: number;
    rowsPerPage?: number;
    sortBy?: string | null;
    sortOrder?: "asc" | "desc" | null;
}
export interface ISearchAndPaginationInfo {
    query?: string
    currentPage?: number;
    rowsPerPage?: number;
    sortBy?: string | null;
    sortOrder?: "asc" | "desc" | null;
}
export const ISearchAndPaginationInfoKeysNames: { [K in keyof ISearchAndPaginationInfo]-?: K } = {
    query: 'query',
    currentPage: 'currentPage',
    rowsPerPage: 'rowsPerPage',
    sortBy: 'sortBy',
    sortOrder: 'sortOrder',
};