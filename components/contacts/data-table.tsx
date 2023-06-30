"use client"

import React from "react"
import { rankItem } from "@tanstack/match-sorter-utils"
// match-sorter is a dependency of @tanstack/react-table and is used to sort and filter data in the table
// it can be used to create custom filters and sorters like a fuzzy search

// fuzzy search is a search algorithm that matches partial strings and is used to find matches even when there are typos

// u can make a global search by using match-sorter's fuzzy search algorithm to search through all the columns in the table

import {
  ColumnDef,
  // ColumnFiltersState,
  FilterFn,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { DataTablePagination } from "./data-table-pagination"
import { DataTableToolbar } from "./data-table-toolbar"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [globalFilter, setGlobalFilter] = React.useState("")

  // https://stackoverflow.com/questions/64171585/highlight-searched-text-inside-the-table

  // add functionality to highlight the searched text in the table
  const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
    // console.log("fuzzyFilter Called")
    const itemRank = rankItem(row.getValue(columnId), value)
    addMeta({
      itemRank,
    })
    return itemRank.passed
  }

  // use CallBack to prevent infinite loop and optimize performance
  const selectFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
    // later I can create a selectedFilters state to used to sort the tags based on the selected filters
    // console.log("selectFilter Called")
    const selectedValues = value
    const values: any = new Set(row.getValue(columnId) as string[])
    const included = [...selectedValues].every((selectedValue) =>
      values.has(selectedValue)
    )
    return included
  }

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    // onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    globalFilterFn: fuzzyFilter,
    filterFns: {
      fuzzy: fuzzyFilter,
      select: selectFilter,
    },
    state: {
      sorting,
      // selectedFilters,
      globalFilter,
    },
  })

  return (
    <div className="space-y-4 w-full">
      <DataTableToolbar table={table} />
      <div className="rounded-md border w-full overflow-y-auto">
        <Table className="relative">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
    </div>
  )
}
