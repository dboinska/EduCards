import { CommonInput } from "@/schemas/CommonInput"
import { Ctx } from "blitz"
import * as z from "zod"

const GetCatalog = z
  .object({
    catalog_catalog_id: z.string().optional(),
    author_catalog_id: z.string().optional(),
  })
  .merge(CommonInput)

interface CatalogDTO {
  catalog_id: string
  name: string
  create_date: Date
  update_date: Date
  author_id: string
  is_shared?: boolean
  number_of_cards: number
  is_favorite: boolean
  description?: string
  image_url: string
  type: string
}

function fakeEndpoint(): Promise<CatalogDTO[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          catalog_id: "1",
          name: "some name",
          description: "description",
          image_url:
            "https://images.unsplash.com/photo-'1'530'1'22037265-a5f'1'f9'1'd3b99?ixcatalog_id=MnwxMjA3fDB8MHxwaG90by'1'wYWdlfHx8fGVufDB8fHx8&ixlib=rb-'1'.2.'1'&auto=format&fit=crop&w=800&q=80",
          number_of_cards: 20,
          is_favorite: true,
          type: "own",
          create_date: new Date("2024-06-01"),
          update_date: new Date("2024-06-01"),
          author_id: "2",
          is_shared: true,
        },
        {
          catalog_id: "2",
          name: "dwa",
          description: "desc",
          image_url: "",
          number_of_cards: 30,
          is_favorite: false,
          type: "public",
          author_id: "2",
          create_date: new Date("2024-06-01"),
          update_date: new Date("2024-06-01"),
        },
        {
          catalog_id: "3",
          name: "XYZ",
          description: "descxyz",
          image_url: "",
          number_of_cards: 3,
          is_favorite: false,
          type: "shared",
          is_shared: true,
          author_id: "2",
          create_date: new Date("2024-06-01"),
          update_date: new Date("2024-06-01"),
        },
      ])
    }, 50)
  })
}

export default async function getCatalogs(input: z.infer<typeof GetCatalog>, ctx: Ctx) {
  // Valcatalog_idate the input
  //const data = GetCatalog.parse(input)

  // Require user to be logged in
  ctx.session.$authorize()

  const catalog = await fakeEndpoint()

  // Can do any processing, fetching from other APIs, etc

  return catalog
}
