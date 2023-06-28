"use client"

import React, { useState } from "react"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, Minus, MoreHorizontal } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Contact } from "@/app/data/schema"

import { CATEGORIES, TAGS } from "../../app/data/data-constants"
import { Button } from "../ui/button"
import { DataTableColumnHeader } from "./data-table-column-header"
import { DataTableRowActions } from "./data-table-row-actions"

// old ColumnDef<Contact>[]
export const columns: any = [
  {
    id: "select",
    header: ({ table }: any) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }: any) => (
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
    accessorFn: (row: any) =>
      `${row.firstName} ${row.lastName}  ${row.website}`,
    header: ({ column }: any) => (
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
    accessorFn: (row: any) => `${row.email}  ${row.phone}`,
    header: ({ column }: any) => (
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
    accessorFn: (row: any) => row.tags,
    header: ({ column }: any) => (
      <DataTableColumnHeader column={column} title="Tags" />
    ),
    cell: ({ row }: any) => {
      const tags = row.getValue("tags")

      // convert the tag values to labels
      const labels = tags.map((tag: string) => {
        const foundTag = TAGS.find((t) => t.value === tag)
        return foundTag ? foundTag.label : tag
      })

      // hide the tags if there are less than 2 and not empty show all tags, else if tags are more than 2 show only 2 tags and hide the rest, else if tags are empty show nothing

      // TODO: add a tooltip to show all tags

      return (
        <div className="flex max-w-[500px] space-x-2">
          {labels.length < 2 && labels.length > 0 ? (
            labels.map((tag: string) => (
              <Badge key={tag} variant="outline" className="h-8 rounded-md">
                {tag}
              </Badge>
            ))
          ) : labels.length > 2 ? (
            <>
              <Badge variant="outline" className="h-8 rounded-md">
                {labels[0]}
              </Badge>
              <Badge variant="outline" className="h-8 rounded-md">
                {labels[1]}
              </Badge>
              <Badge variant="outline" className="h-8 rounded-md">
                <MoreHorizontal className="w-4 h-4" />
                {/* show the length of all tags */}
                <span className="ml-1">{`(${labels.length - 2})`}</span>
              </Badge>
            </>
          ) : (
            // show empty icon
            <Badge variant="outline" className="h-8 rounded-md">
              <Minus className="w-4 h-4" />
            </Badge>
          )}
        </div>
      )
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

      // convert the categories values to labels
      const labels = categories.map((category: string) => {
        const foundCategory = CATEGORIES.find((t) => t.value === category)
        return foundCategory ? foundCategory.label : category
      })

      return (
        <div className="flex max-w-[500px] space-x-2">
          {labels.map((category: string) => (
            <Badge key={category} variant="outline" className="h-8 rounded-md">
              {category}
            </Badge>
          ))}
        </div>
      )
    },
    filterFn: "select",
    enableGlobalFilter: false,
  },
  // {
  //   id: "projects",
  //   accessorFn: (row: any) => row.projects.map(({ title }: any) => title),
  //   header: "Projects",
  //   cell: ({ row }: any) => {
  //     return (
  //       <div className="flex flex-row space-x-2">
  //         {row.original.projects.map(({ uuid, title, status }: any) => (
  //           <div key={uuid} className="flex space-x-1 items-center">
  //             <Badge variant="outline" className="h-8 rounded-md">
  //               {status}
  //             </Badge>
  //             <span className="truncate font-medium">{title}</span>
  //           </div>
  //         ))}
  //       </div>
  //     )
  //   },
  // },
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
  {
    accessorKey: "netRating",
    header: "NetRating",
    cell: ({ row }: any) => {
      return (
        <div className="flex justify-center">
          {row.getValue("netRating").toString()}/10
        </div>
      )
    },
  },
  {
    id: "actions",
    cell: ({ row }: any) => <DataTableRowActions row={row} />,
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
