import { z } from "zod"

export const username = z
  .string()
  .min(1, { message: "User name is required" })
  .max(20, { message: "Name must be 20 characters or less" })

export const avatar = z.string()

export const email = z
  .string()
  .email()
  .transform((str) => str.toLowerCase().trim())

export const password = z
  .string()
  .min(8, { message: "Password must have 8-12 characters" })
  .max(12, { message: "Password must have 8-12 characters" })
  .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>])/, {
    message:
      "Password must include at least one lowercase letter, one uppercase letter, and one special character",
  })
  .transform((str) => str.trim())

export const Signup = z
  .object({
    username,
    email,
    avatar,
    password,
    passwordConfirmation: password,
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords don't match",
    path: ["passwordConfirmation"],
  })

export const Login = z.object({
  email,
  password: z.string(),
})

export const ForgotPassword = z.object({
  email,
})

export const ResetPassword = z
  .object({
    password: password,
    passwordConfirmation: password,
    token: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords don't match",
    path: ["passwordConfirmation"],
  })

export const ChangePassword = z.object({
  currentPassword: z.string(),
  newPassword: password,
})

export const EditProfileSchema = z
  .object({
    username: z.string().min(1, "Username is required"),
    email: z.string().email("Invalid email"),
    isPublic: z.boolean(),
    imageUrl: z.string().nullable().optional(),
    cover: z.string().nullable().optional(),
    currentPassword: z.string(),
    newPassword: z.union([password, z.literal("").optional()]),
    newPasswordConfirmation: z.union([password, z.literal("").optional()]),
  })
  .refine((data) => data.newPassword === data.newPasswordConfirmation, {
    message: "Passwords don't match",
    path: ["passwordConfirmation"],
  })
