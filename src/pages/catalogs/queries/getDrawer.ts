import { CommonInput } from "@/schemas/CommonInput"
import { Ctx } from "blitz"
import { z } from "zod"

const GetCatalog = z
  .object({
    compartionId: z.string().optional(),
    userId: z.string().optional(),
    catalogId: z.string().optional(),
  })
  .merge(CommonInput)

export interface DrawerDTO {
  drawer_id: string
  user_id: string
  catalog_id: string
  create_date: Date
  card_id: string
  name: string
  frequency: string
  learned_cards: number
  all_cards: number
  left_cards: number
  color: string
}

export interface CardDTO {
  card_id: string
  catalog_id: string
  term: string
  description: string
  term_translated: string
  description_translated: string
  create_date: Date
  update_date: Date
  is_favorite: boolean
  author_id: string
  image_url?: string
}

interface CatalogDTO {
  cards: CardDTO[]
  drawers: DrawerDTO[]
  id: string
}

function fakeEndpoint(): Promise<CatalogDTO> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: "80604ed0-d9cf-463b-95ed-6a2bffa83ad2",
        cards: [
          {
            card_id: "1",
            catalog_id: "Catalog XYZ",
            term: "Name",
            description: "Name",
            term_translated: "Nazwa",
            description_translated: "Nazwa",
            create_date: new Date("2024-06-01"),
            update_date: new Date("2024-06-03"),
            is_favorite: true,
            author_id: "2",
          },
          {
            card_id: "2",
            catalog_id: "Catalog XYZ",
            term: "Name",
            description: "Name",
            term_translated: "Nazwa",
            description_translated: "Nazwa",
            create_date: new Date("2024-06-01"),
            update_date: new Date("2024-06-03"),
            is_favorite: true,
            author_id: "2",
          },
          {
            card_id: "3",
            catalog_id: "Catalog XYZ",
            term: "Name",
            description: "Name",
            term_translated: "Nazwa",
            description_translated: "Nazwa",
            create_date: new Date("2024-06-01"),
            update_date: new Date("2024-06-03"),
            is_favorite: true,
            author_id: "2",
            image_url:
              "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
          },
        ],
        drawers: [
          {
            drawer_id: "1",
            user_id: "1",
            catalog_id: "2",
            create_date: new Date("2024-06-01"),
            card_id: "3,4",
            name: "ftgyhuj",
            frequency: "Daily",
            learned_cards: 2,
            left_cards: 1,
            all_cards: 3,
            color: "var(--mantine-color-yellow-6)",
          },
          {
            drawer_id: "2",
            user_id: "1",
            catalog_id: "2",
            create_date: new Date("2024-06-01"),
            card_id: "3,4",
            name: "ftgyhuj",
            learned_cards: 2,
            left_cards: 21,
            color: "var(--mantine-color-lime-6)",
            frequency: "Every 2 days",
            all_cards: 23,
          },
          {
            drawer_id: "3",
            user_id: "1",
            catalog_id: "2",
            create_date: new Date("2024-06-01"),
            card_id: "3,4",
            name: "ftgyhuj",
            learned_cards: 2,
            left_cards: 10,
            color: "var(--mantine-color-green-6)",
            frequency: "Every 4 days",
            all_cards: 12,
          },
          {
            drawer_id: "4",
            user_id: "1",
            catalog_id: "2",
            create_date: new Date("2024-06-01"),
            card_id: "3,4",
            name: "ftgyhuj",
            learned_cards: 2,
            left_cards: 9,
            color: "var(--mantine-color-teal-6)",
            frequency: "Weekly",
            all_cards: 11,
          },
          {
            drawer_id: "5",
            user_id: "1",
            catalog_id: "2",
            create_date: new Date("2024-06-01"),
            card_id: "3,4",
            name: "ftgyhuj",
            learned_cards: 1,
            left_cards: 0,
            color: "var(--mantine-color-blue-6)",
            frequency: "Every 2 weeks",
            all_cards: 1,
          },
          {
            drawer_id: "6",
            user_id: "1",
            catalog_id: "2",
            create_date: new Date("2024-06-01"),
            card_id: "3,4",
            name: "ftgyhuj",
            learned_cards: 2,
            left_cards: 1,
            color: "var(--mantine-color-violet-6)",
            frequency: "Monthly",
            all_cards: 3,
          },
          {
            drawer_id: "7",
            user_id: "1",
            catalog_id: "2",
            create_date: new Date("2024-06-01"),
            card_id: "3,4",
            name: "ftgyhuj",
            learned_cards: 0,
            left_cards: 0,
            color: "var(--mantine-color-pink-6)",
            frequency: "Every 2 months",
            all_cards: 0,
          },
        ],
      })
    }, 50)
  })
}

export default async function getCatalogs(input: z.infer<typeof GetCatalog>, ctx: Ctx) {
  // Validate the input
  //const data = GetCatalog.parse(input)

  // Require user to be logged in
  ctx.session.$authorize()

  const catalog = await fakeEndpoint()

  // Can do any processing, fetching from other APIs, etc

  return catalog
}
