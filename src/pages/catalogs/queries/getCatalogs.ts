import { CommonInput } from "@/schemas/CommonInput"
import { Ctx } from "blitz"
import * as z from "zod"
import db from "db"

const GetCatalog = z
  .object({
    catalog_catalog_id: z.string().optional(),
    author_catalog_id: z.string().optional(),
  })
  .merge(CommonInput)

export default async function getCatalogs(input: z.infer<typeof GetCatalog>, ctx: Ctx) {
  // Valcatalog_idate the input
  //const data = GetCatalog.parse(input)

  // Require user to be logged in
  ctx.session.$authorize()

  const catalog = await db.catalog.findMany()
  // console.log({ catalog })

  // Can do any processing, fetching from other APIs, etc

  return catalog
}
