import Layout from "src/core/layouts/Layout"
import { BlitzPage, Routes } from "@blitzjs/next"
import styles from "src/styles/Catalogs.module.css"
import Link from "next/link"
import { ActionIcon, Avatar, Box, Flex, Badge, Title } from "@mantine/core"
import { useCurrentUser } from "@/users/hooks/useCurrentUser"
import { IconHeart, IconHeartFilled } from "@tabler/icons-react"
import { AutocompleteLoading } from "src/components/AutocompleteLoading"
import { CatalogHeader } from "@/components/CatalogHeader"
import { ToggleMenu } from "@/components/ToggleMenu"
import { useMutation, useQuery } from "@blitzjs/rpc"
import getStudyPlans from "./queries/getStudyPlans"
import { gSSP } from "@/blitz-server"
import { InferGetServerSidePropsType } from "next"
import router from "next/router"
import deleteStudyPlan from "./mutations/deleteStudyPlan"

export interface StudyPlansProps {
  id: number
  image?: string
  header: string
  desc?: string
  isFavorite?: boolean
  authorId: number
}

const sharedWith = [
  {
    label: "Date ascending",
    name: "Date ascending",
    image:
      "https://extraextrabricks.pl/environment/cache/images/500_500_productGfx_3935/Mini-figurka-LEGO-City-kobieta--mama-w-fioletowej-bluzie%2C-piaskowych-spodniach.webp",
  },
  {
    label: "Date descending",
    name: "Date descending",
    image:
      "https://extraextrabricks.pl/environment/cache/images/500_500_productGfx_3935/Mini-figurka-LEGO-City-kobieta--mama-w-fioletowej-bluzie%2C-piaskowych-spodniach.webp",
  },
  {
    label: "Alphabetically",
    name: "Alphabetically",
    image:
      "https://extraextrabricks.pl/environment/cache/images/500_500_productGfx_3935/Mini-figurka-LEGO-City-kobieta--mama-w-fioletowej-bluzie%2C-piaskowych-spodniach.webp",
  },
  {
    label: "Reverse alphabetically",
    name: "Reverse alphabetically",
    image:
      "https://extraextrabricks.pl/environment/cache/images/500_500_productGfx_3935/Mini-figurka-LEGO-City-kobieta--mama-w-fioletowej-bluzie%2C-piaskowych-spodniach.webp",
  },
  {
    label: "Randomly",
    name: "Randomly",
    image:
      "https://extraextrabricks.pl/environment/cache/images/500_500_productGfx_3935/Mini-figurka-LEGO-City-kobieta--mama-w-fioletowej-bluzie%2C-piaskowych-spodniach.webp",
  },
]

const StudyPlans: BlitzPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({
  query,
  studyPlansWithCompletion,
}) => {
  const isFavorite = false
  const currentUser = useCurrentUser()
  const favCard = currentUser ? (
    <ActionIcon variant="subtle" radius="md" size={22}>
      {isFavorite ? (
        <IconHeartFilled className={styles.favorite} stroke={2} />
      ) : (
        <IconHeart className={styles.favorite} stroke={2} />
      )}
    </ActionIcon>
  ) : null

  const [deletePlanMutation] = useMutation(deleteStudyPlan)

  const studyPlans = studyPlansWithCompletion

  console.log({ studyPlans })

  async function handleDeletePlan(planId: string) {
    console.log("Deleting plan with ID:", planId)
    try {
      await deletePlanMutation({ id: planId }, { onSuccess: () => console.log("success") })
    } catch (error) {
      console.error("Failed to delete study plan:", error)
    }
  }

  async function handleEditPlan(planId: string) {
    try {
      console.log("Attempting to delete plan with ID:", planId)

      await router.push(Routes.EditStudyPlan({ id: planId }))
    } catch (error) {
      console.error("Failed to edit study plan:", error)
    }
  }

  console.log({ query })

  const content = () => {
    return (
      <>
        {studyPlans.map((plan) => {
          const planSettings = [
            {
              label: "Edit",
              id: "edit",
              action: () => handleEditPlan(plan.id),
            },
            {
              label: "Delete",
              path: Routes.Catalogs(),
              id: "delete",
              action: () => handleDeletePlan(plan.id),
            },
          ]
          return (
            <div key={plan.id} className={` ${styles.body}`}>
              <Link
                className={styles.cardContent}
                href={Routes.CatalogId({ id: plan.catalogId as string })}
              >
                <div className={styles.headerContainer}>
                  <Title order={2} style={{ color: plan.color }}>
                    {plan.name}
                  </Title>
                  <Badge variant="light" color={plan.color}>
                    {plan.catalog.name}
                  </Badge>
                </div>
                <Title order={3} my="sm">
                  {plan.completionPercentage}%{" "}
                  <span style={{ fontSize: "16px", fontWeight: "400" }}>completed</span>
                </Title>
                <Flex align="start" gap="8px" justify="space-between">
                  <Title order={4} m="0">
                    <span style={{ fontSize: "12px", fontWeight: "400" }}>
                      {plan.daysPerWeek} days / week
                    </span>
                  </Title>
                  <Title order={4} m="0">
                    <span style={{ fontSize: "12px", fontWeight: "400" }}>
                      {" "}
                      {Math.ceil((plan.secondsPerDay ?? 0) / 60)} minutes / day
                    </span>
                  </Title>
                  <Title order={4} m="0">
                    <span style={{ fontSize: "12px", fontWeight: "400" }}>
                      {plan.wordsPerDay} words / day
                    </span>
                  </Title>
                </Flex>
              </Link>
              <div className={styles.inline}>
                <Flex gap="8px" className={styles.author} align="center">
                  <Avatar
                    src={currentUser?.imageUrl}
                    alt="Jacob Warnhalter"
                    radius="xl"
                    size="sm"
                  />
                  {/* <span>You</span> */}
                </Flex>
                <Badge color={plan.color}>
                  {new Date(plan.createdAt).toLocaleDateString()} -{" "}
                  {new Date(plan.completionDate).toLocaleDateString()}
                </Badge>
                <Flex className={styles.controls}>
                  {currentUser?.id && <ToggleMenu sm item={"study plan"} settings={planSettings} />}

                  {favCard}
                </Flex>
              </div>
            </div>
          )
        })}
      </>
    )
  }
  return (
    <Layout title="Study Plans">
      <main className={styles.main}>
        <CatalogHeader
          authorId={currentUser?.id}
          header={"Study Plans"}
          link={Routes.NewStudyPlan()}
        />
        <div className={styles.filters}>
          <AutocompleteLoading />
          <Flex align={"center"} justify={"space-between"}>
            <label style={{ fontSize: "var(--mantine-font-size-sm)", fontWeight: 500 }}>
              Sort by:{" "}
            </label>
            <Box w="270px">{/* <Picker data={sharedWith} /> */}</Box>
          </Flex>
        </div>
        <div className={styles.gridCatalogs}>{content()}</div>
      </main>
    </Layout>
  )
}

export const getServerSideProps = gSSP(async ({ query, ctx }) => {
  const studyPlans = await getStudyPlans(query, ctx)
  console.log({ studyPlans })

  const studyPlansWithCompletion = await Promise.all(
    studyPlans.map(async (plan) => {
      const totalCards = plan.catalog.numberOfCards
      const numberOfDrawers = plan.catalog.amountOfDrawers

      const catalogDrawers = plan.catalog.drawers

      console.log({ drawers: plan.catalog.drawers })

      const lastDrawer = Array.isArray(catalogDrawers)
        ? catalogDrawers[catalogDrawers.length - 1]?.numberOfCards
        : 0

      console.log({ lastDrawer })

      const completionPercentage =
        totalCards && lastDrawer ? Number((lastDrawer / totalCards) * 100).toFixed(0) : 0
      console.log({
        catalogDrawers,
        catalog: plan.catalog,
        totalCards,
        lastDrawer,
        numberOfDrawers,
        completionPercentage,
      })

      return { ...plan, completionPercentage }
    })
  )

  return {
    props: { query, studyPlansWithCompletion },
  }
})

export default StudyPlans
