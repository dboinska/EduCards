import { z } from "zod"
import { IMAGE_MIME_TYPE } from "@mantine/dropzone"

const MAX_FILE_SIZE = 5 * 1024 ** 2

// const imageUploadSchema = z.object({
//   image: z.array(
//     z.object({
//       size: z.number().max(MAX_FILE_SIZE, "Max image size is 5MB."),
//       type: z.string().refine((type) => IMAGE_MIME_TYPE.includes(type), "Invalid file type"),
//     })
//   ),
// })

export const fileSchema = z.object({
  image: z.object({
    mimetype: z.string().refine((val) => IMAGE_MIME_TYPE.includes(val as any), {
      message: "Invalid file type",
    }),
    size: z.number().lte(MAX_FILE_SIZE, "File size must be less than 5MB"),
  }),
})

export type FileSchema = z.infer<typeof fileSchema>
