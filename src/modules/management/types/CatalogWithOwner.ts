import type { Catalog, User } from "db"

export interface CatalogWithOwner extends Catalog {
  owner: User
}
