import fs from "fs"
import path from "path"
import { faker } from "@faker-js/faker"

// prettier-ignore
import { CATEGORIES, PAYMENT_STATUSES, PROJECT_PRIORITIES, PROJECT_STATUSES, TAGS } from "./data-constants";

import { Contact } from "./schema"

// run ts-node --compiler-options {\"module\":\"CommonJS\"} app/data/seed.ts

// Refactor

const TagsEnum = TAGS.map((tag) => tag.value)
const CategoriesEnum = CATEGORIES.map((category) => category.value)
const ProjectStatusesEnum = PROJECT_STATUSES.map((status) => status.value)
const PaymentStatusesEnum = PAYMENT_STATUSES.map((status) => status.value)
const ProjectPrioritiesEnum = PROJECT_PRIORITIES.map(
  (priority) => priority.value
)

const randomNum = Math.floor(Math.random() * 5) + 1

const data: Contact[] = Array.from({ length: 100 }, () => ({
  uuid: faker.string.uuid(),
  hubspotContactId: faker.string.uuid(),
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  compony: faker.company.buzzVerb(),
  website: faker.internet.url(),
  email: faker.internet.email(),
  phone: faker.phone.number("###-###-####"),
  tags: faker.helpers.arrayElements(TagsEnum, { min: 1, max: TAGS.length }),
  categories: faker.helpers.arrayElements(CategoriesEnum, {
    min: 1,
    max: CATEGORIES.length,
  }),
  netRating: faker.number.int({ min: 1, max: 10 }),
  notes: Array.from({ length: 2 }, () => ({
    uuid: faker.string.uuid(),
    creationDate: faker.date.past().toISOString(),
    noteContent: faker.hacker.phrase(),
  })),
  projects: Array.from({ length: randomNum }, () => ({
    uuid: faker.string.uuid(),
    title: faker.commerce.product(),
    priorities: faker.helpers.arrayElement(ProjectPrioritiesEnum),
    status: faker.helpers.arrayElement(ProjectStatusesEnum),
    notes: Array.from({ length: randomNum }, () => ({
      uuid: faker.string.uuid(),
      creationDate: faker.date.past().toISOString(),
      noteContent: faker.hacker.phrase(),
    })),
  })),
  earnings: Array.from({ length: randomNum }, () => ({
    uuid: faker.string.uuid(),
    amount: faker.number.int({ min: 1000, max: 10000 }),
    status: faker.helpers.arrayElement(PaymentStatusesEnum),
  })),
}))

fs.writeFileSync(
  path.join(__dirname, "contacts.json"),
  JSON.stringify(data, null, 2)
)

console.log("✅ Tasks data generated.")
