import { promises as fs } from "fs"
import path from "path"
import { Metadata } from "next"
import Link from "next/link"
import { z } from "zod"

import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/button"
import { columns } from "@/components/contacts/columns"
import { DataTable } from "@/components/contacts/data-table"

import { ContactSchema } from "./data/schema"

export const metadata: Metadata = {
  title: "Contacts",
  description: "A list of contacts build using Tanstack Table.",
}

// Get data from a JSON file
async function getData() {
  const filePath = path.join(process.cwd(), "app/data", "contacts.json")
  const fileContents = await fs.readFile(filePath, "utf8")
  return z.array(ContactSchema).parse(JSON.parse(fileContents))
}

export default async function MainPage() {
  const data = await getData()

  return (
    <>
      <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
        <div className="flex max-w-[980px] flex-col items-start gap-2">
          <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
            Beautifully designed components <br className="hidden sm:inline" />
            built with Radix UI and Tailwind CSS.
          </h1>
          <p className="max-w-[700px] mt-3 text-lg text-muted-foreground">
            Accessible and customizable components that you can copy and paste
            into your apps. Free. Open Source. And Next.js 13 Ready.
          </p>
        </div>
        <div className="flex gap-4">
          <Link
            target="_blank"
            rel="noreferrer"
            href={siteConfig.links.github}
            className={buttonVariants({ variant: "outline" })}
          >
            GitHub
          </Link>
        </div>
        <DataTable data={data} columns={columns} />
      </section>
      <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex"></div>
    </>
  )
}
