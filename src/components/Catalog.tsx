import styles from "src/styles/Catalogs.module.css"
import { Avatar, Badge, Flex } from "@mantine/core"
import Link from "next/link"
import { ToggleMenu } from "./ToggleMenu"
import { Routes } from "@blitzjs/next"
import { RouteUrlObject } from "blitz"
import { useEffect, useState } from "react"

interface Owner {
  id: string
  email: string
  imageUrl: string | null
  name: string | null
}

interface CatalogSetting {
  label: string
  path?: RouteUrlObject
  id: string
  action?: (catalogId: string) => void
}

interface CatalogProps {
  imageURL?: string | null
  numberOfCards: number
  description?: string | null
  owner: Owner
  isOwn: boolean
  catalogSettings: CatalogSetting[]
  catalogId: string
}

const Catalog = ({
  children,
  imageURL,
  numberOfCards,
  description,
  owner,
  isOwn,
  catalogSettings,
  catalogId,
}: React.PropsWithChildren<CatalogProps>) => {
  const [settings, setSettings] = useState(catalogSettings || [])
  const handleDelete = () => {
    console.log("handle delete")
    const deleteItem = catalogSettings.find((item) => item.id === "delete")

    if (!deleteItem) {
      return
    }

    deleteItem?.action?.(catalogId)
  }

  useEffect(() => {
    if (catalogSettings) {
      const overridenSettings = catalogSettings.map((setting) => {
        if (setting.id !== "delete") {
          return setting
        }
        return {
          ...setting,
          action: handleDelete,
        }
      })
      setSettings(overridenSettings)
    }
  }, [])

  const handleEdit = () => {
    console.log("handle edit")
    const deleteItem = catalogSettings.find((item) => item.id === "edit")

    if (!deleteItem) {
      return
    }

    deleteItem?.action?.(catalogId)
  }

  useEffect(() => {
    if (catalogSettings) {
      const overridenSettings = catalogSettings.map((setting) => {
        if (setting.id !== "edit") {
          return setting
        }
        return {
          ...setting,
          action: handleEdit,
        }
      })
      setSettings(overridenSettings)
    }
  }, [])

  return (
    <div
      className={`${imageURL && styles.withOverlay} ${styles.body}`}
      style={{
        backgroundImage: `url(${imageURL})`,
      }}
    >
      <div className={imageURL ? styles.overlay : ""}></div>
      <Link className={styles.cardContent} href={Routes.CatalogId({ id: catalogId })}>
        <div className={styles.headerContainer}>
          <h2>{children}</h2>
          <Badge size="sm" variant="outline" color="var(--mantine-color-gray-3)">
            {numberOfCards} cards
          </Badge>
        </div>
        <h3>{description}</h3>
      </Link>
      <div className={styles.inline}>
        <div className={styles.author}>
          <Avatar src={owner.imageUrl} alt={owner?.name || "Persona image"} radius="xl" size="sm" />
          <span>{owner.name}</span>
        </div>
        <Flex className={styles.controls}>
          {isOwn && <ToggleMenu item={"catalog"} settings={settings} />}

          {/* {favCard(true)} */}
        </Flex>
      </div>
    </div>
  )
}

export default Catalog
