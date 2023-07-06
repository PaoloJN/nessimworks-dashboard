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

async function getData() {
  const filePath = path.join(process.cwd(), "app/data", "contacts.json")
  const fileContents = await fs.readFile(filePath, "utf8")
  return z.array(ContactSchema).parse(JSON.parse(fileContents))
}

export default async function MainPage() {
  const data = await getData()

  return (
    <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
      <DataTable data={data} columns={columns} />
    </div>
  )
}
