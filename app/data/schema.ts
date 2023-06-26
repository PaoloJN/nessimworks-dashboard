import { z } from "zod"

// Refactor

import {
  CATEGORIES,
  PAYMENT_STATUSES,
  PROJECT_PRIORITIES,
  PROJECT_STATUSES,
  TAGS,
} from "./data-constants"

const getValues = (items: any) => items.map((item: any) => item.value)

const TagsEnum = z.enum(getValues(TAGS))
const CategoriesEnum = z.enum(getValues(CATEGORIES))
const ProjectPrioritiesEnum = z.enum(getValues(PROJECT_PRIORITIES))
const ProjectStatusesEnum = z.enum(getValues(PROJECT_STATUSES))
const PaymentStatusesEnum = z.enum(getValues(PAYMENT_STATUSES))

export const NoteSchema = z.object({
  uuid: z.string(),
  creationDate: z.string(),
  noteContent: z.string(),
})

export const ProjectSchema = z.object({
  uuid: z.string(),
  title: z.string(),
  priorities: ProjectPrioritiesEnum,
  status: ProjectStatusesEnum,
  notes: z.array(NoteSchema),
})

export const EarningsSchema = z.object({
  uuid: z.string(),
  amount: z.number(),
  status: PaymentStatusesEnum,
})

export const ContactSchema = z.object({
  uuid: z.string(),
  hubspotContactId: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  compony: z.string(),
  website: z.string().url(),
  email: z.string().email(),
  phone: z.string(),
  tags: z.array(TagsEnum),
  categories: z.array(CategoriesEnum),
  netRating: z.number().min(1).max(10),
  notes: z.array(NoteSchema),
  projects: z.array(ProjectSchema),
  earnings: z.array(EarningsSchema),
})

export type Contact = z.infer<typeof ContactSchema>
