import { fileSchema } from "@/schemas/File.schema"

import type { Ctx } from "blitz"
import type { FileSchema } from "@/schemas/File.schema"

export default async function imageUpload(input: FileSchema, ctx: Ctx) {
  console.log({ input })

  const data = fileSchema.parse(input)
  if (!ctx.session) {
    throw new Error("Session not initialized")
  }
  ctx.session.$authorize()

  return "asdasdas"
}
