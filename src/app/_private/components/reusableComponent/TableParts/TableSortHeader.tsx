"use client"
import { ISearchAndPaginationInfoKeysNames } from "@/app/_private/models/Common/Pagination";
import { TableSortLabel } from "@mui/material";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const TableSortHeader = ({ columnId, label }: { columnId: string, label: string }) => {

    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const sortBy = searchParams.get(ISearchAndPaginationInfoKeysNames.sortBy) || "";
    const sortOrderParam = searchParams.get(ISearchAndPaginationInfoKeysNames.sortOrder) || "";
    const sortOrder: "asc" | "desc" | null = sortOrderParam === "asc" || sortOrderParam === "desc" ? sortOrderParam : null;

    const handleSort = (columnId: string) => {
        const params = new URLSearchParams(searchParams);
        const isAsc = sortBy === columnId && sortOrder === "asc";

        params.set(ISearchAndPaginationInfoKeysNames.sortBy, columnId.toString());
        params.set(ISearchAndPaginationInfoKeysNames.sortOrder, isAsc ? "desc" : "asc");

        router.push(`${pathname}?${params.toString()}`);
    };


    return (
        < TableSortLabel
            active={sortBy === columnId}
            direction={sortBy === columnId ? sortOrder ?? "asc" : undefined}
            onClick={() => handleSort(columnId)}
        >
            {label}
        </TableSortLabel >
    )
}



export default TableSortHeader;