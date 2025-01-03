import { z } from "zod"

import { passwordFieldSchema } from "@/modules/auth/schemas/CommonAuth.schema"

export const editProfileSchema = z
  .object({
    username: z.string().min(1, "Username is required"),
    email: z.string().email("Invalid email"),
    isPublic: z.boolean(),
    imageUrl: z.string().nullable().optional(),
    cover: z.string().nullable().optional(),
    currentPassword: z.string(),
    newPassword: z.union([passwordFieldSchema, z.literal("").optional()]),
    newPasswordConfirmation: z.union([passwordFieldSchema, z.literal("").optional()]),
    apiKey: z.string().nullable().optional(),
  })
  .refine((data) => data.newPassword === data.newPasswordConfirmation, {
    message: "Passwords don't match",
    path: ["passwordConfirmation"],
  })

export type EditProfileSchema = z.infer<typeof editProfileSchema>
