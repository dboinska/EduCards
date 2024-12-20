import Link from "next/link"
import { Routes } from "@blitzjs/next"
import { clsx } from "clsx"

import styles from "@/styles/CatalogTile.module.css"

interface CatalogTileProps {
  title: string
  description?: string | null
  linkId: string
  imageURL?: string | null
}

export const CatalogTile = ({
  title,
  description = "No description available.",
  imageURL,
  linkId,
}: CatalogTileProps) => {
  const backgroundImage = imageURL ? `url(${imageURL})` : "none"
  const textColor = imageURL ? "white" : "black"

  return (
    <div
      className={clsx(styles.root, imageURL && styles.withOverlay)}
      style={{ backgroundImage, height: "140px", color: textColor }}
    >
      {imageURL && <div className={styles.overlay}></div>}
      <Link className={styles.cardContent} href={Routes.CatalogId({ id: linkId })}>
        <div className={styles.headerContainer}>
          <h2>{title}</h2>
        </div>
        {description && <h3>{description}</h3>}
      </Link>
    </div>
  )
}
