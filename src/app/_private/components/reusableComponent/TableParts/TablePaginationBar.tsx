'use client';
import { ISearchAndPaginationInfoKeysNames } from "@/app/_private/models/Common/Pagination";
import { TablePagination } from "@mui/material";
import { usePathname, useRouter, useSearchParams } from "next/navigation";


export const TablePaginationBar = ({ totalCount }: { totalCount: number }) => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const currentPage = Number(searchParams.get(ISearchAndPaginationInfoKeysNames.currentPage)) || 0;
    const rowsPerPage = Number(searchParams.get(ISearchAndPaginationInfoKeysNames.rowsPerPage)) || 10;

    const handleChangePage = (_event: unknown, newPage: number) => {
        const params = new URLSearchParams(searchParams);
        params.set(ISearchAndPaginationInfoKeysNames.currentPage, newPage.toString());
        router.push(`${pathname}?${params.toString()}`);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        const params = new URLSearchParams(searchParams);
        params.set(ISearchAndPaginationInfoKeysNames.rowsPerPage, parseInt(event.target.value, 10).toString());
        router.push(`${pathname}?${params.toString()}`);
    };
    return (
        < TablePagination
            rowsPerPageOptions={[10, 25, 50]}
            component="div"
            count={totalCount}
            rowsPerPage={rowsPerPage}
            page={currentPage}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
        />)
}
