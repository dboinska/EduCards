import { Routes } from "@blitzjs/next"
import { Button, Flex, rem } from "@mantine/core"
import { IconCirclePlus, IconCards } from "@tabler/icons-react"
import type { Ctx, RouteUrlObject } from "blitz"
import Link from "next/link"

import styles from "src/styles/CatalogHeader.module.css"
import { ToggleMenu } from "./ToggleMenu"
import { useCurrentUser } from "@/users/hooks/useCurrentUser"
import { useMutation } from "@blitzjs/rpc"
import deleteCatalog from "@/pages/catalogs/mutations/deleteCatalog"
import createLearnSession from "@/pages/drawer/mutations/createLearnSession"
import { useState } from "react"

interface CatalogHeaderProps {
  header: string
  link?: RouteUrlObject
  learningMode?: boolean
  studyPlanMode?: boolean
  settings?: boolean
  ownerId?: string
  catalogId?: string
  drawerId?: string
}

const gradient =
  "linear-gradient(45deg, var(--mantine-color-blue-filled) 0%, var(--mantine-color-lime-filled) 100%)"

export function CatalogHeader({
  header,
  link,
  learningMode,
  studyPlanMode,
  settings,
  ownerId,
  catalogId,
  drawerId,
}: CatalogHeaderProps) {
  const currentUser = useCurrentUser()
  const [isClicked, setIsClicked] = useState(false)

  const [deleteCatalogMutation] = useMutation(deleteCatalog)
  const [createLearnSessionMutation] = useMutation(createLearnSession)

  const handleSuccess = () => {
    console.log("xxx")
  }

  async function handleDeleteCatalog(catalogId: string) {
    try {
      console.log("Attempting to delete catalog with ID:", catalogId)

      await deleteCatalogMutation(catalogId, { onSuccess: handleSuccess })
    } catch (error) {
      console.error("Failed to delete catalog:", error)
    }
  }
  const catalogSettings = catalogId
    ? [
        {
          label: "Add study plan",
          path: Routes.NewStudyPlan(),
          id: "newStudyPlan",
        },
        {
          label: "Edit",
          path: Routes.EditCatalog({ id: catalogId }),
          id: "edit",
        },
        {
          label: "Delete",
          path: Routes.Catalogs(),
          id: "delete",
          action: () => handleDeleteCatalog(catalogId),
        },
      ]
    : []

  async function handleLearn() {
    if (!currentUser) {
      console.error("User not found")
    }
    setIsClicked(true)
    try {
      console.log("Attempting to create learn session")

      console.log({ userId: currentUser?.id, catalog: catalogId, drawerId: drawerId })

      await createLearnSessionMutation(
        {
          userId: currentUser?.id as string,
          catalogId: catalogId as string,
          drawerId: drawerId as string,
          sessionStart: new Date(),
        },
        { onSuccess: handleSuccess }
      )
    } catch (error) {
      console.error("Failed to create learn session:", error)
    }
  }

  return (
    <div className={styles.header}>
      <h1>{header}</h1>
      <Flex gap="16px" className={styles.links} align="center">
        {learningMode && (
          <Button
            variant="gradient"
            gradient={{ from: "lime", to: "blue" }}
            radius="md"
            size="sm"
            component={Link}
            //
            href={Routes.LearnPage({ id: drawerId as string, sliding: true })}
            onClick={handleLearn}
            loading={isClicked}
            disabled={isClicked}
          >
            <IconCards /> Let&apos;s learn
          </Button>
        )}
        {studyPlanMode && (
          <Button
            variant="gradient"
            gradient={{ from: "lime", to: "blue" }}
            radius="md"
            size="sm"
            component={Link}
            href={Routes.Catalogs()}
          >
            <IconCards /> Let&apos;s learn
          </Button>
        )}
        {link && ((!ownerId && currentUser?.id) || ownerId === currentUser?.id) && (
          <Button
            component={Link}
            href={link}
            radius="md"
            styles={{
              root: {
                padding: rem(2),
                border: 0,
                backgroundImage: gradient,
              },

              inner: {
                background: "var(--mantine-color-body)",
                color: "var(--mantine-color-blue-filled)",
                borderRadius: "calc(var(--button-radius) - 2px)",
                paddingLeft: "var(--mantine-spacing-md)",
                paddingRight: "var(--mantine-spacing-md)",
              },

              label: {
                backgroundImage: gradient,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              },
            }}
          >
            <IconCirclePlus /> Add new
          </Button>
        )}

        {settings && ownerId === currentUser?.id && (
          <ToggleMenu item={"catalog"} settings={catalogSettings} />
        )}
      </Flex>
    </div>
  )
}
