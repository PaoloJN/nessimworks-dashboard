"use client"

import React from "react"
import { ColumnDef } from "@tanstack/react-table"

import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"

// import { Contact } from "@/app/data/schema"

import { CATEGORIES, TAGS } from "../../app/data/data-constants"
import { DataTableColumnHeader } from "./data-table-column-header"
import { DataTableRowActions } from "./data-table-row-actions"
import { ShowLabels } from "./data-table-show-labels"

// old ColumnDef<Contact>[]
export const columns: any = [
  {
    id: "select",
    header: ({ table }: any) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px] mx-[7px]"
      />
    ),
    cell: ({ row }: any) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px] mx-[7px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "name",
    accessorFn: (row: any) =>
      `${row.firstName} ${row.lastName}  ${row.website}`,
    header: ({ column }: any) => (
      <DataTableColumnHeader column={column} title="Contact Name" />
    ),
    cell: ({ row }: any) => {
      const [fullName, website] = row.getValue("name").split("  ")
      // show just the 10 first characters of the website
      const websiteShort = website.slice(0, 30).concat("...")

      return (
        <div className="flex flex-col space-y-[3px] w-auto">
          <span className="font-medium text-[12.5px]">{fullName}</span>
          <span className="text-[10px] text-muted-foreground">
            {websiteShort}
          </span>
        </div>
      )
    },
  },
  {
    id: "info",
    accessorFn: (row: any) => `${row.email}  ${row.phone}`,
    header: ({ column }: any) => (
      <DataTableColumnHeader column={column} title="Contact Infomation" />
    ),
    cell: ({ row }: any) => {
      const [email, phone] = row.getValue("info").split("  ")

      return (
        <div className="flex flex-col space-y-[3px] min-w-fit">
          <span className="font-medium text-[12.5px]">{email}</span>
          <span className="text-[10px] text-muted-foreground">{phone}</span>
        </div>
      )
    },
  },
  {
    id: "tags",
    accessorFn: (row: any) => row.tags,
    header: ({ column }: any) => (
      <DataTableColumnHeader column={column} title="Tags" />
    ),
    cell: ({ row }: any) => {
      const tags = row.getValue("tags")
      const labels = tags.map((tag: string) => {
        return TAGS.find((t) => t.value === tag)?.label || tag
      })

      return <ShowLabels labels={labels} />
    },
    filterFn: "select",
    enableGlobalFilter: false,
  },
  {
    id: "categories",
    accessorFn: (row: any) => row.categories,
    header: ({ column }: any) => (
      <DataTableColumnHeader column={column} title="Categories" />
    ),
    cell: ({ row }: any) => {
      const categories = row.getValue("categories")
      const labels = categories.map((category: string) => {
        return CATEGORIES.find((t) => t.value === category)?.label || category
      })

      return <ShowLabels labels={labels} />
    },
    filterFn: "select",
    enableGlobalFilter: false,
  },
  {
    id: "projects",
    accessorFn: (row: any) => row.projects.length,
    header: ({ column }: any) => (
      <DataTableColumnHeader column={column} title="Total Projects" />
    ),
    cell: ({ row }: any) => {
      const totalProjects = row.getValue("projects")
      return (
        <div className="flex justify-center ml-[-15px]">
          <Badge variant="outline" className="h-7 rounded-md">
            <span className="text-[11px] font-medium">{totalProjects}</span>
          </Badge>
        </div>
      )
    },
  },
  {
    id: "earnings",
    // prettier-ignore
    accessorFn: (row: any) => row.earnings.map(({ amount }: any) => amount).reduce((a: any, b: any) => a + b, 0),
    header: ({ column }: any) => (
      <DataTableColumnHeader column={column} title="Total Earnings" />
    ),
    cell: ({ row }: any) => {
      const formatAmount = (amount: string) => {
        return new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(parseFloat(amount))
      }

      const totalEarnings = formatAmount(row.getValue("earnings"))

      return (
        <div className="flex justify-center ml-[-15px]">
          <span className="text-[11px] font-medium text-green-500">
            {totalEarnings}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "netRating",
    header: ({ column }: any) => (
      <DataTableColumnHeader column={column} title="Rating" />
    ),
    cell: ({ row }: any) => {
      const netRating = row.getValue("netRating")
      return (
        <div className="flex justify-center ml-[-15px]">
          <span className="font-medium text-[11px]">{netRating}/10</span>
        </div>
      )
    },
  },
  {
    id: "actions",
    cell: ({ row }: any) => <DataTableRowActions row={row} />,
  },
]
