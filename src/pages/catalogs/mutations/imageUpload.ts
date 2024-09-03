import { Ctx } from "blitz"
import db from "db"
import { IMAGE_MIME_TYPE } from "@mantine/dropzone"
import { z } from "zod"

const MAX_FILE_SIZE = 5 * 1024 ** 2

const imageUploadSchema = z.object({
  image: z
    .any()
    .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
    .refine(
      (files) => IMAGE_MIME_TYPE.includes(files?.[0]?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    ),
})

const fileSchema = z.object({
  image: z.object({
    mimetype: z.string().refine((val) => IMAGE_MIME_TYPE.includes(val as any), {
      message: "Invalid file type",
    }),
    size: z.number().lte(MAX_FILE_SIZE, "File size must be less than 5MB"),
  }),
})

export default async function imageUpload(input: z.infer<typeof fileSchema>, ctx: Ctx) {
  // Validate input - very important for security

  console.log({ input })

  const data = fileSchema.parse(input)

  // Require user to be logged in
  ctx.session.$authorize()

  return "asdasdas"
}
