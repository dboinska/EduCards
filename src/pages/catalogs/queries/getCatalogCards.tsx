import { CommonInput } from "@/schemas/CommonInput"
import type { Ctx } from "blitz"
import { z } from "zod"

const GetCatalogCards = z
  .object({
    card_id: z.string().optional(),
    catalog_id: z.string().optional(),
    author_id: z.number().optional(),
  })
  .merge(CommonInput)

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

function fakeEndpoint(): Promise<CardDTO[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
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
          image_url:
            "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
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
      ])
    }, 50)
  })
}

export default async function getCatalogs(input: z.infer<typeof GetCatalogCards>, ctx: Ctx) {
  // Validate the input
  //const data = GetCatalog.parse(input)

  // Require user to be logged in
  ctx.session.$authorize()

  const catalog = await fakeEndpoint()

  // Can do any processing, fetching from other APIs, etc

  return catalog
}
