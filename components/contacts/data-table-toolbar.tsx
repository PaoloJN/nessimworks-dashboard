"use client"

import * as React from "react"
import { Table } from "@tanstack/react-table"
import { Plus, X } from "lucide-react"

import { Button } from "@/components/ui/button"

import { CATEGORIES, TAGS } from "../../app/data/data-constants"
import { CreateContactPopup } from "./create-contact-form"
import { DataTableFacetedFilter } from "./data-table-faceted-filter"
import { SearchInput } from "./data-table-search"
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
        <CreateContactPopup />
        <DataTableViewOptions table={table} />
      </div>
    </div>
  )
}
