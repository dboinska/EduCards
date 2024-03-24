import { Button } from "@mantine/core"
import { IconCirclePlus } from "@tabler/icons-react"
import { RouteUrlObject } from "blitz"
import Link from "next/link"

import styles from "src/styles/CatalogHeader.module.css"

interface CatalogHeaderProps {
  header: string
  link: RouteUrlObject
}

export function CatalogHeader({ header, link }: CatalogHeaderProps) {
  return (
    <div className={styles.header}>
      <h1>{header}</h1>
      <Link href={link} passHref>
        <Button component="a" variant="filled" color="var(--mantine-color-blue-6)" radius="md">
          <IconCirclePlus /> Add new
        </Button>
      </Link>
    </div>
  )
}
