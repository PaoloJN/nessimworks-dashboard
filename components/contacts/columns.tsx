"use client"

import React, { useState } from "react"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Contact } from "@/app/data/schema"

import { TAGS } from "../../app/data/data-constants"
import { Button } from "../ui/button"
import { DataTableColumnHeader } from "./data-table-column-header"
import { DataTableRowActions } from "./data-table-row-actions"

export const columns: ColumnDef<Contact>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "contactName",
    accessorFn: (row) => `${row.firstName} ${row.lastName}  ${row.website}`,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Contact Name" />
    ),
    cell: ({ row }: any) => {
      const [fullName, website] = row.getValue("contactName").split("  ")

      return (
        <div className="flex flex-col space-y-1">
          <span className="max-w-[500px] font-medium">{fullName}</span>
          <span className="text-xs text-muted-foreground">{website}</span>
        </div>
      )
    },
  },
  {
    id: "contactInfo",
    accessorFn: (row) => `${row.email}  ${row.phone}`,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Contact Infomation" />
    ),
    cell: ({ row }: any) => {
      // split email and phone
      const [email, phone] = row.getValue("contactInfo").split("  ")

      return (
        <div className="flex flex-col space-y-1">
          <span className="max-w-[500px] font-medium">{email}</span>
          <span className="text-xs text-muted-foreground">{phone}</span>
        </div>
      )
    },
  },
  {
    id: "tags",
    accessorFn: (row) => row.tags,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tags" />
    ),
    cell: ({ row }: any) => {
      const tags = row.getValue("tags")

      const displayTags = tags.map((tag: string) => {
        const foundTag = TAGS.find((t) => t.value === tag)
        return foundTag ? foundTag.label : tag
      })

      return (
        <>
          <div className="flex max-w-[500px] space-x-2">
            {displayTags.map((tag: string) => (
              <Badge key={tag} variant="outline" className="h-8 rounded-md">
                {tag}
              </Badge>
            ))}
          </div>
        </>
      )
    },
    enableGlobalFilter: false,
  },
  //   {
  //     id: "categories",
  //     accessorFn: (row) => row.categories.join(", "),
  //     header: "Categories",
  //     cell: ({ row }: any) => {
  //       return (
  //         <OverflowHider>
  //           <div className="flex max-w-[500px] space-x-1">
  //             {row
  //               .getValue("categories")
  //               .split(", ")
  //               .map((tag: string) => (
  //                 <Badge key={tag} variant="outline" className="rounded-md ml-1">
  //                   {tag}
  //                 </Badge>
  //               ))}
  //           </div>
  //         </OverflowHider>
  //       )
  //     },
  //   },
  //   {
  //     id: "projects",
  //     accessorFn: (row) => row.projects.map(({ title }: any) => title),
  //     header: "Projects",
  //     cell: ({ row }: any) => {
  //       return (
  //         <OverflowHider>
  //           {row.original.projects.map(({ uuid, title, status }: any) => (
  //             <div key={uuid} className="flex space-x-1">
  //               <Badge variant="outline" className="ml-1">
  //                 {status}
  //               </Badge>
  //               <span className="truncate font-medium">{title}</span>
  //             </div>
  //           ))}
  //         </OverflowHider>
  //       )
  //     },
  //   },
  //   {
  //     id: "earnings",
  //     accessorFn: (row) => row.earnings.map(({ amount }: any) => amount),
  //     header: "Earnings",
  //     cell: ({ row }: any) => {
  //       const formatAmount = (amount: string) => {
  //         return new Intl.NumberFormat("en-US", {
  //           style: "currency",
  //           currency: "USD",
  //         }).format(parseFloat(amount))
  //       }

  //       return (
  //         <OverflowHider>
  //           {row.original.earnings.map(({ amount, status }: any, index: any) => (
  //             <div key={index}>
  //               <span className="ml-1 font-medium">{formatAmount(amount)}</span>
  //               <Badge variant="outline" className="ml-1">
  //                 {status}
  //               </Badge>
  //             </div>
  //           ))}
  //         </OverflowHider>
  //       )
  //     },
  //   },
  //   {
  //     accessorKey: "netRating",
  //     header: "NetRating",
  //     cell: ({ row }: any) => {
  //       return (
  //         <div className="flex justify-center">
  //           {row.getValue("netRating").toString()}/10
  //         </div>
  //       )
  //     },
  //   },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
]

interface OverflowHiderProps {
  children: React.ReactNode
  width?: string
  className?: string
}

const OverflowHider = ({
  children,
  width = "200px",
  className = "",
}: OverflowHiderProps) => {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div
      className={`flex overflow-x-auto w-[${width}] scrollbar-hide ${
        !isExpanded && "whitespace-nowrap"
      } ${className}`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      {React.Children.map(children, (child, index) =>
        React.cloneElement(child as React.ReactElement, {
          className: `flex flex-row ${index !== 0 && !isExpanded && "hidden"}`,
        })
      )}
      {!isExpanded && <span className="ml-1 font-medium">...</span>}
    </div>
  )
}