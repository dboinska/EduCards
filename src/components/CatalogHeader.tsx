import { Routes } from "@blitzjs/next"
import { Button, Flex, rem } from "@mantine/core"
import { IconCirclePlus, IconCards } from "@tabler/icons-react"
import { RouteUrlObject } from "blitz"
import Link from "next/link"

import styles from "src/styles/CatalogHeader.module.css"
import { ToggleMenu } from "./ToggleMenu"
import { useCurrentUser } from "@/users/hooks/useCurrentUser"

interface CatalogHeaderProps {
  header: string
  link?: RouteUrlObject
  learningMode?: boolean
  studyPlanMode?: boolean
  settings?: boolean
  authorId: string
}

const gradient =
  "linear-gradient(45deg, var(--mantine-color-blue-filled) 0%, var(--mantine-color-lime-filled) 100%)"

const catalogSettings = [
  {
    label: "Add study plan",
    path: Routes.NewStudyPlan(),
    id: "newStudyPlan",
  },
  {
    label: "Edit",
    path: Routes.NewCatalog(),
    id: "edit",
  },
  {
    label: "Delete",
    path: Routes.Catalogs(),
    id: "delete",
  },
]

export function CatalogHeader({
  header,
  link,
  learningMode,
  studyPlanMode,
  settings,
  authorId,
}: CatalogHeaderProps) {
  const currentUser = useCurrentUser()
  return (
    <div className={styles.header}>
      <h1>{header}</h1>
      <Flex gap="8px" className={styles.links}>
        {learningMode && (
          <Link href={Routes.Cards()} passHref>
            <Button
              variant="gradient"
              gradient={{ from: "lime", to: "blue" }}
              radius="md"
              size="sm"
            >
              <IconCards /> Let's learn
            </Button>
          </Link>
        )}
        {studyPlanMode && (
          <Link href={Routes.Catalog()} passHref>
            <Button
              variant="gradient"
              gradient={{ from: "lime", to: "blue" }}
              radius="md"
              size="sm"
            >
              <IconCards /> Let's learn
            </Button>
          </Link>
        )}
        {link && (
          <Link href={link} passHref>
            <Button
              component="a"
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
          </Link>
        )}

        {settings && currentUser?.id && (
          //  === authorId
          <ToggleMenu item={"catalog"} settings={catalogSettings} />
        )}
      </Flex>
    </div>
  )
}
