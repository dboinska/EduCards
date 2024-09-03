import styles from "src/styles/Catalogs.module.css"
import { Avatar, Badge, Button, Flex, Image } from "@mantine/core"
import Link from "next/link"
import { Routes } from "@blitzjs/next"
import { RouteUrlObject } from "blitz"
import { useEffect, useState } from "react"
import { IconSettings } from "@tabler/icons-react"
import { useRouter } from "next/router"

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

  const { push } = useRouter()

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

  async function handleEdit(catalogId: string) {
    await push(Routes.EditCatalog({ id: catalogId }))
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
        position: "relative",
      }}
    >
      {imageURL && (
        <Image
          src={imageURL}
          alt="background image"
          w="100%"
          h="100%"
          style={{ position: "absolute", top: 0, left: 0 }}
        />
      )}

      <div className={imageURL ? styles.overlay : ""}></div>
      <Link className={styles.cardContent} href={Routes.CatalogId({ id: catalogId })}>
        <div className={styles.headerContainer}>
          <h2>{children}</h2>
          <Badge size="sm" variant="filled" color="var(--mantine-color-lime-5)">
            {numberOfCards} cards
          </Badge>
        </div>
        <h3>{description}</h3>
      </Link>
      <div className={styles.inline}>
        <Flex align="center" gap="var(--mantine-spacing-sm)">
          <Avatar
            src={owner.imageUrl}
            color={imageURL ? "white" : "blue"}
            alt={owner?.name || "Persona image"}
            radius="xl"
            size="sm"
          />
          <Badge
            size="sm"
            variant={imageURL ? "white" : "light"}
            color="var(--mantine-color-blue-5)"
          >
            {owner.name || "Owner"}
          </Badge>
        </Flex>
        <Flex className={styles.controls}>
          {isOwn && (
            <Button
              p="0 2px"
              w="24"
              h="24"
              radius="xl"
              onClick={() => handleEdit(catalogId)}
              className={styles.iconSettings}
              variant="transparent"
              color="var(--mantine-color-gray-8)"
            >
              <IconSettings />
            </Button>
          )}

          {/* {favCard(true)} */}
        </Flex>
      </div>
    </div>
  )
}

export default Catalog
