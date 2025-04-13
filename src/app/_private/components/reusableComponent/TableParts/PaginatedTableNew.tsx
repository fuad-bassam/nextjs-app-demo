"use server";
import React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { TableColumnFormat } from "../../../models/Common/TableColumnFormat";
import { TablePaginationBar } from "./TablePaginationBar";
import TableSortHeader from "./TableSortHeader";

interface PaginatedTableProps<T> {
  data: T[];
  columns: TableColumnFormat<T>[];
  totalCount: number;
  actions?: (row: T) => React.ReactNode;

}

const PaginatedTableNew = <T,>({
  data,
  columns,
  totalCount,
  actions,
}: PaginatedTableProps<T>) => {

  return (

    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="paginated table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id as string}>
                  <TableSortHeader columnId={column.id as string} label={column.label} />
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, rowIndex) => (
              <TableRow hover role="checkbox" tabIndex={-1} key={rowIndex}>
                {columns.map((column) => {
                  const value = row[column.id];

                  return (
                    <TableCell key={column.id as string}>
                      {column.format ? column.format(value) : String(value)}
                    </TableCell>
                  );
                })}
                {actions && (
                  <TableCell>
                    {actions(row)}
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePaginationBar totalCount={totalCount} />
    </Paper>
  );
};

export default PaginatedTableNew;
