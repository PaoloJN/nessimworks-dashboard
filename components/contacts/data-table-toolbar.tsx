"use client"

import * as React from "react"
import { Table } from "@tanstack/react-table"
import { Plus, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { CATEGORIES, TAGS } from "../../app/data/data-constants"
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
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            alert("Create new Contact")
          }}
        >
          <Plus className="h-3.5 w-3.5" />
          {/* <span>Create</span> */}
        </Button>

        <DialogDemo />

        <DataTableViewOptions table={table} />
      </div>
    </div>
  )
}

export function DialogDemo() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when youre done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" value="Paolo" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input
              id="username"
              value="Blah blah blah"
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
