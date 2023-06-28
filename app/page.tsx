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
// - add tooltip to show more of tags and categories
// - Render all the data in the table
// - check with dad about the selectMenu and searchInput and see if need to change or fix
// - change the style of the selectMenu
// - change the sorting functionality
// - add the types for all the components
// - optimize all rendering, filtering, searching, etc.
// - add CRUD functionality to the table and tags and categories
// - fix the view of table

export default async function MainPage() {
  const data = await getData()

  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <DataTable data={data} columns={columns} />
    </section>
  )
}
