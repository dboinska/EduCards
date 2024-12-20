import { z } from "zod"
import {
  usernameFieldSchema,
  emailFieldSchema,
  passwordFieldSchema,
  avatarFieldSchema,
} from "./CommonAuth.schema"

export const signupSchema = z
  .object({
    username: usernameFieldSchema,
    email: emailFieldSchema,
    avatar: avatarFieldSchema,
    password: passwordFieldSchema,
    passwordConfirmation: passwordFieldSchema,
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords don't match",
    path: ["passwordConfirmation"],
  })

export type SignupSchema = z.infer<typeof signupSchema>
