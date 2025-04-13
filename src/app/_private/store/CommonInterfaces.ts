import { IPaginationInfo } from "../models/Common/Pagination";

export const initialPagination: IPaginationInfo = {
    currentPage: 0,
    rowsPerPage: 10,
    sortBy: null as string | null,
    sortOrder: null as "asc" | "desc" | null,
} 