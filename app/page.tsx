import { promises as fs } from "fs"
import path from "path"
import { Metadata } from "next"
import { z } from "zod"

import { columns } from "@/components/contacts/columns"
import { DataTable } from "@/components/contacts/data-table"

import { ContactSchema } from "./data/schema"

export const metadata: Metadata = {
  title: "Dashboard",
  description: "A list of contacts build using Tanstack Table.",
}

// Get data from a JSON file
async function getData() {
  const filePath = path.join(process.cwd(), "app/data", "contacts.json")
  const fileContents = await fs.readFile(filePath, "utf8")
  return z.array(ContactSchema).parse(JSON.parse(fileContents))
}

// TODO:
// // - add tooltip to show more of tags and categories
// //- Render all the data in the table Done
// // - check with dad about the selectMenu and searchInput and see if need to change or fix Done
// - change the style of the selectMenu
// // - change the sorting functionality Done
// - add the types for all the components
// - optimize all rendering, filtering, searching, etc.
// - add database with CRUD api
// - add CRUD functionality to the table and tags and categories
// - fix the view of table

// <section className="container items-center pb-8 pt-6 md:py-10"></section>

export default async function MainPage() {
  const data = await getData()

  return (
    <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
      <DataTable data={data} columns={columns} />
    </div>
  )
}


      // <div className="flex items-center justify-between space-y-2">
      //   <div>
      //     <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
      //     <p className="text-muted-foreground">
      //       Here&apos;s a list of your tasks for this month!
      //     </p>
      //   </div>
      //   <div className="flex items-center space-x-2">{/* <UserNav /> */}</div>
      // </div>