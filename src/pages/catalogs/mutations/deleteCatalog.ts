import { Ctx } from "blitz"
import db from "db"

export default async function deleteCatalog(catalogId: string, ctx: Ctx) {
  if (!ctx.session.userId) {
    throw new Error("User not logged in")
  }

  try {
    const catalog = await db.catalog.findUnique({ where: { catalogId: catalogId } })
    if (catalog?.ownerId !== ctx.session.userId) {
      throw new Error("User not authorized to delete this catalog")
    }

    const deletedCatalog = await db.catalog.delete({
      where: { catalogId: catalogId },
    })

    return deletedCatalog
  } catch (error) {
    console.error("Error deleting catalog:", error)
    throw new Error("Failed to delete catalog")
  }
}
