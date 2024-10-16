import { IMAGE_MIME_TYPE } from "@mantine/dropzone"
import { Ctx } from "blitz"
import { z } from "zod"

const MAX_FILE_SIZE = 5 * 1024 ** 2

const imageUploadSchema = z.object({
  image: z.array(
    z.object({
      size: z.number().max(MAX_FILE_SIZE, "Max image size is 5MB."),
      type: z.string().refine((type) => IMAGE_MIME_TYPE.includes(type), "Invalid file type"),
    })
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
  console.log({ input })

  const data = fileSchema.parse(input)
  ctx.session.$authorize()

  return "asdasdas"
}
