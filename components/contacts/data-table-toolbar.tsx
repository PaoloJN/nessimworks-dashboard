"use client"

import * as React from "react"
import { Table } from "@tanstack/react-table"
import { Plus, Search, X } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { CATEGORIES, TAGS } from "../../app/data/data-constants"
import { DataTableFacetedFilter } from "./data-table-faceted-filter"
import { DataTableViewOptions } from "./data-table-view-options"

// import { DataTableViewOptions } from "./data-table-view-options"

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered =
    table.getPreFilteredRowModel().rows.length >
    table.getFilteredRowModel().rows.length

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        {/* <Input
          placeholder="Filter Contacts..."
          value={
            (table.getColumn("contactInfo")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("contactInfo")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        /> */}

        <SearchInput
          placeholder="Search Contacts"
          className="h-10 w-[150px] lg:w-[250px]"
          value={table.getState().globalFilter ?? ""}
          onChange={(event) => table.setGlobalFilter(event.target.value)}
        />
        {table.getColumn("tags") && (
          <DataTableFacetedFilter
            column={table.getColumn("tags")}
            title="Tags"
            options={TAGS}
          />
        )}
        {table.getColumn("categories") && (
          <DataTableFacetedFilter
            column={table.getColumn("categories")}
            title="Categories"
            options={CATEGORIES}
          />
        )}
        {/* {table.getColumn("priority") && (
          <DataTableFacetedFilter
            column={table.getColumn("priority")}
            title="Priority"
            options={TAGS}
          />
        )} */}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => {
              table.resetGlobalFilter()
              table.resetColumnFilters()
            }}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <X className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      {/* Create new Contact button */}
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          className="h-10 p-3"
          onClick={() => {
            alert("Create new Contact")
          }}
        >
          <Plus className="h-4 w-4 mr-2" />
          <span>Create</span>
        </Button>

        <DataTableViewOptions table={table} />
      </div>
    </div>
  )
}

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const SearchInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <div className="relative flex items-center">
        <Search className="h-[15px] w-[15px] absolute translate-x-[11px]" />
        <input
          type={type}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-8 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={ref}
          {...props}
        />
      </div>
    )
  }
)

SearchInput.displayName = "Input.Search"
