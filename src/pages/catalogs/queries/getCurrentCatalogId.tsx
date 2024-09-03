import db from "db"

export default async function getCurrentCatalog(userId: string) {
  if (!userId) {
    throw new Error("User not logged in")
  }

  const catalog = await db.catalog.findFirst({
    where: {
      ownerId: userId,
    },
    orderBy: {
      createdAt: "desc",
    },
    select: {
      catalogId: true,
    },
  })

  if (!catalog) {
    throw new Error("No catalog found for the current user")
  }

  return catalog.catalogId
}
