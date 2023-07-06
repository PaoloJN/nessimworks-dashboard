/* eslint-disable react/no-unescaped-entities */
"use client"

import React from "react"
import { Plus } from "lucide-react"
import { useForm } from "react-hook-form"

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
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

// import { Label } from "@/components/ui/label"

interface ICreateContactPopup {}

// TODO:
// https://react-hook-form.com/get-started#Quickstart

export const CreateContactPopup: React.FC<ICreateContactPopup> = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Plus className="h-3.5 w-3.5" />
        </Button>
      </DialogTrigger>
      <CreateContactForm />
    </Dialog>
  )
}

interface ICreateContactForm {}

export const CreateContactForm: React.FC<ICreateContactForm> = () => {
  const form = useForm()

  function onSubmit(values: any) {
    console.log("handleSubmit Called")
    alert("Create new Contact")
  }

  return (
    <DialogContent className="max-w-[45rem]">
      <DialogHeader>
        <DialogTitle>Create New Contact</DialogTitle>
        <DialogDescription>
          Fill out the form below to create a new contact. Click the save when
          you're done.
        </DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex space-x-4">
            <div className="flex flex-col space-y-4 w-full">
              {renderFormField("firstName", "First Name", "John")}
              {renderFormField("email", "Email", "example@example.com")}
              {renderFormField("company", "Company Name", "ABC Corp")}
              {renderFormField("netRate", "Net Rating", "5.0")}
              {renderFormField("urls", "URLs", "http://www.example.com")}
            </div>
            <div className="flex flex-col space-y-4 w-full">
              {renderFormField("lastName", "Last Name", "Doe")}
              {renderFormField("phone", "Phone", "+1234567890")}
              {renderFormField("website", "Website", "www.example.com")}
              {renderFormField("categories", "Categories", "Tech, Software")}
              {renderFormField("tags", "Tags", "Tag1, Tag2")}
            </div>
          </div>
        </form>
      </Form>
      <DialogFooter>
        <Button variant="outline">Close</Button>
        <Button type="submit">Create</Button>
      </DialogFooter>
    </DialogContent>
  )

  function renderFormField(name: string, label: string, placeholder: string) {
    return (
      <FormField
        control={form.control}
        name={name}
        render={({ field }) => (
          <FormItem className="w-full">
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <Input placeholder={placeholder} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    )
  }
}
