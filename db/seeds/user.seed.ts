import { faker } from "@faker-js/faker"
import { SecurePassword } from "@blitzjs/auth/secure-password"

import type { User } from "../index"

export type GeneratedPerson = Pick<
  User,
  "name" | "email" | "imageUrl" | "cover" | "isPublic" | "hashedPassword"
>

const getPasswordHash = async (password: string) => {
  return await SecurePassword.hash(password.trim())
}

export const generatePerson = async (): Promise<GeneratedPerson> => {
  const firstName = faker.person.firstName()
  const lastName = faker.person.lastName()
  const email = faker.internet.email({ firstName, lastName, provider: "example.com" })

  const hashedPassword = await getPasswordHash(faker.internet.password({ length: 20 }))

  return {
    name: `${firstName} ${lastName}`,
    email,
    imageUrl: faker.image.avatar(),
    cover: faker.image.urlPicsumPhotos(),
    isPublic: faker.datatype.boolean(),
    hashedPassword,
  }
}
