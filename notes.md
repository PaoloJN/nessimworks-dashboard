# Notes

## Setup

1. **PostgreSQL Database** - Use Postgres.app for setting up a PostgreSQL database. Check out this [tutorial](https://www.youtube.com/watch?v=wTqosS71Dc4&t=100s&ab_channel=Prisma).

2. **Prisma Seed** - Learn how to seed in Prisma. Here is a helpful [video](https://www.youtube.com/watch?v=2LwTUIqjbPo&ab_channel=Prisma).

3. **Database Diagram** - Plan and visualize your database schema with [dbdiagram.io](https://dbdiagram.io/d).

4. **PGAdmin** - Master the use of pgAdmin. This [tutorial](https://www.youtube.com/watch?v=WFT5MaZN6g4&ab_channel=DatabaseStar) will help.

5. **Git ssh** - Setting Up SSH Keys for GitHub [tutorial](https://www.youtube.com/watch?v=8X4u9sca3Io&ab_channel=VictorGeislinger)

## Next.js 13 with Prisma

- Understand the integration of Next.js 13 with Prisma using these resources:
  - [Blog post](https://mael.app/blog/nextjs-13-app-directory-prisma-3nnl) by Mael
  - Prisma's official [documentation](https://www.prisma.io/docs/guides/other/troubleshooting-orm/help-articles/nextjs-prisma-client-dev-practices)

## Other References

- Visit [Craft](https://craft.mxkaske.dev/) for some crafty ideas.
- Check out these tweets for insights and discussions:
  - Tweet by [@\_ShaunAnderson](https://twitter.com/_ShaunAnderson/status/1661632252068102144/photo/1)
  - Tweet by [@jjjjeeffff](https://twitter.com/jjjjeeffff/status/1656476058420666368)
  - Dribbble by [Casap](https://dribbble.com/shots/19382619-Contacts-list-details)

## Terminal Database Connection

To connect to the database from the terminal, use the following command:

```bash
psql postgresql://paolonessim@localhost:5432/db
```

Filter data by multiple tags and categories example:

```js
let data = []

let selectedTags = new Set(["tag1", "tag4"]) // convert array to Set
let selectedCategories = new Set(["cat1", "cat2"]) // convert array to Set

let filteredData = data.filter((item) => {
  let itemTags = new Set(item.tags)
  let itemCategories = new Set(item.categories)

  return (
    [...selectedTags].every((tag) => itemTags.has(tag)) &&
    [...selectedCategories].every((category) => itemCategories.has(category))
  )
})
```

https://www.youtube.com/watch?v=AuLg79Th3xE&ab_channel=MafiaCodes

# Contact Information

**UUID:** b30eb01e-53d5-4bff-9487-914c32df700a

**Hubspot Contact ID:** a76da777-a738-46cf-8d9a-837197fb6933

**Name:** Malachi Zulauf

**Company:** facilitate

**Website:** [https://devoted-ping.com](https://devoted-ping.com)

**Email:** [Sid.Hamill91@hotmail.com](mailto:Sid.Hamill91@hotmail.com)

**Phone:** 351-770-1560

**Tags:**

**Categories:** tech, marketing, seo, ecommerce, design

**Net Rating:** 10

# Notes

1. **UUID:** dd673afd-3b70-46e7-b5e3-548028afa351

   - **Creation Date:** 2022-12-01T13:07:03.388Z
   - **Content:** Try to transmit the SSD matrix, maybe it will navigate the haptic bandwidth!

2. **UUID:** 4c537eb9-1589-4689-8f6e-2e9fbbd25e51
   - **Creation Date:** 2022-11-05T05:41:40.047Z
   - **Content:** Use the 1080p TCP card, then you can navigate the open-source microchip!

(Trimmed due to length)

# Projects

1. **UUID:** 76200571-5060-4438-bf56-78b76c8a9fce
   - **Title:** Table
   - **Priorities:** high
   - **Status:** canceled

(Trimmed due to length)

# Earnings

1. **UUID:** 19589fa6-9ed6-43d3-8862-352e6ddf32ca

   - **Amount:** 8512
   - **Status:** paid

2. **UUID:** 7d356590-b550-4c21-a569-77d85bfe3955
   - **Amount:** 5512
   - **Status:** overdue

(Trimmed due to length)
