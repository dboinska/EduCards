import { Ctx } from "blitz"
import * as z from "zod"

const GetCatalog = z.object({
  id: z.number().optional(),
  name: z.string().optional(),
  description: z.string().optional(),
  url: z.string().optional(),
  numberOfCards: z.number().optional(),
  isFavorite: z.boolean().optional(),
  type: z.string().optional(),
})

interface CatalogProps {
  id: number
  url?: string
  name: string
  description?: string
  isFavorite: boolean
  numberOfCards: number
  type: string
}

function fakeEndpoint(): Promise<CatalogProps[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          name: "some name",
          description: "description",
          url: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
          numberOfCards: 20,
          isFavorite: true,
          type: "own",
        },
        {
          id: 2,
          name: "dwa",
          description: "desc",
          url: "",
          numberOfCards: 30,
          isFavorite: false,
          type: "public",
        },
        {
          id: 3,
          name: "XYZ",
          description: "descxyz",
          url: "",
          numberOfCards: 3,
          isFavorite: false,
          type: "shared",
        },
      ])
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
