import { faker } from "@faker-js/faker"

import type { User } from "../index"

type GeneratedPerson = Pick<
  User,
  "name" | "email" | "imageUrl" | "cover" | "isPublic" | "hashedPassword"
>

const PASSWORD_HASH =
  "JGFyZ29uMmlkJHY9MTkkbT02NTUzNix0PTIscD0xJEJsZi9WVHhBMkZnQ213SEliRWtjckEkbmJnN3Y0b3FhTnR5V21MdHBLYyt4Ni9NbTkrMXdOM200UkJUZ1FEWWlKUQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA="

export const generatePerson = (): GeneratedPerson => {
  const firstName = faker.person.firstName()
  const lastName = faker.person.lastName()
  const email = faker.internet.email({ firstName, lastName, provider: "example.com" })

  return {
    name: `${firstName} ${lastName}`,
    email,
    imageUrl: faker.image.avatar(),
    cover: faker.image.urlPicsumPhotos(),
    isPublic: faker.datatype.boolean(),
    hashedPassword: PASSWORD_HASH,
  }
}
