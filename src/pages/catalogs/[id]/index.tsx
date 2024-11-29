import { BlitzPage, Routes } from "@blitzjs/next"
import { gSSP } from "src/blitz-server"
import getCatalog from "../queries/getCatalog"
import { CatalogSchema } from "@/schemas/Catalog.schema"
import type { InferGetServerSidePropsType } from "next"
import Layout from "@/core/layouts/Layout"
import { CatalogHeader } from "@/components/CatalogHeader"
import { Box, Flex, TextInput } from "@mantine/core"
import { DrawerCard } from "@/components/DrawerCard"
import { Picker, PickerOption } from "@/components/Picker"
import { sortBy } from "@/utils/sortBy"
import styles from "src/styles/Catalogs.module.css"
import { useSession } from "@blitzjs/auth"
import { useState, useReducer, useEffect } from "react"
import { useDebouncedCallback } from "@mantine/hooks"
import { actionTypes, dataReducer, initialState } from "@/reducers/dataReducer"
import { useRouter } from "next/router"
import { SortType } from "@/types/SortType"
import { CatalogCard } from "@/components/CatalogCard"
import { frequencyColorMap, frequencyDictionary } from "@/utils/frequency"
import LottieAnimation from "@/components/LottieAnimation"
import trophyAnimation from "public/animations/trophy.json"
import checkAnimation from "public/animations/check.json"
import starAnimation from "public/animations/star.json"
import achievementAnimation from "public/animations/achievement.json"
import { showNotification } from "@mantine/notifications"
import getStudyPlans from "@/pages/studyPlan/queries/getStudyPlans"
import getLearnSessions from "@/pages/drawer/queries/getLearnSessions"
import { getDailyAggregatedResult } from "@/utils/getDailyAggregatedResults"
import { AggregatedResult } from "@/types/AggregatedResult"
import { getWeeklyAggregatedResult } from "@/utils/getWeeklyAggregatedResults"
import { getCompletionPercentage } from "@/utils/getCompletionPercentage"
import { getDateHelpers } from "@/utils/getDateHelpers"
import { filterSessionByDate } from "@/utils/filterSessionsByDate"
import { filterSessionsByRange } from "@/utils/filterSessionsByRange"
import { isDateWithinRange } from "@/utils/isDateWithinRange"

const useNotifications = () => {
  const showAnimation = (
    title: string,
    message: string,
    animation: any,
    width: number,
    height: number,
    marginRight: number
  ) => {
    showNotification({
      title,
      message: (
        <Flex align="center">
          <LottieAnimation
            animationData={animation}
            loop
            style={{ width: width, height: height, marginRight: marginRight }}
          />
          <span>{message}</span>
        </Flex>
      ),
      color: "green",
      autoClose: 5000,
    })
  }
  return {
    handleStudyPlanSuccess: () =>
      showAnimation(
        "Study plan completed!",
        "Congratulations on completing your study plan.",
        trophyAnimation,
        80,
        80,
        10
      ),
    handleTimeSuccess: () =>
      showAnimation(
        "Daily goal achieved!",
        "Time of daily study completed.",
        checkAnimation,
        60,
        60,
        10
      ),
    handleCardSuccess: () =>
      showAnimation(
        "Daily goal achieved!",
        "Mastered daily amount of cards.",
        starAnimation,
        60,
        60,
        10
      ),
    handleWeeklySuccess: () =>
      showAnimation(
        "Weekly goal achieved!",
        "Achieved planned study days this week.",
        achievementAnimation,
        80,
        80,
        10
      ),
  }
}

const CatalogId: BlitzPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({
  query,
  catalog,
  dailyAggregatedResult,
  studyPlanForCatalog,
  completionPercentage,
}) => {
  const router = useRouter()
  const [_, dispatch] = useReducer(dataReducer, {
    ...initialState,
    ...query,
  })
  const [searchValue, setSearchValue] = useState(() => query.query || "")
  const [cards, setCards] = useState(() => catalog?.cards || [])
  const [_catalogDrawers, setCatalogDrawers] = useState(catalog?.drawers || [])

  const drawers = catalog?.drawers

  const [cardCounts, setCardCounts] = useState(drawers?.map((drawer) => drawer?.numberOfCards))

  const { handleStudyPlanSuccess, handleTimeSuccess, handleCardSuccess, handleWeeklySuccess } =
    useNotifications()

  console.log({ amount: catalog?.amountOfDrawers })

  const handleCardDelete = (cardId: string) => {
    setCards((prevCards) => prevCards.filter((card) => card.cardId !== cardId))
  }

  console.log({ drawers })
  console.log({ cards })
  const session = useSession({ suspense: false })

  const ownerId = session?.userId || null

  const handleSortChange = async ({ value }: PickerOption) => {
    dispatch({
      type: actionTypes.sort,
      payload: {
        sort: value as SortType,
      },
    })

    await router.push({ query: { ...router.query, sort: value } })
  }

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.currentTarget.value)
    handleSearch(event.currentTarget.value)
  }

  const handleSearch = useDebouncedCallback(async (query: string) => {
    dispatch({
      type: actionTypes.search,
      payload: { query },
    })

    const routerQuery = {
      ...(query.length > 0 && { query, id: router.query.id }),
    }

    await router.push(routerQuery)
  }, 500)

  useEffect(() => {
    if (!dailyAggregatedResult || typeof dailyAggregatedResult !== "object") {
      console.warn("dailyAggregatedResult is invalid:", dailyAggregatedResult)
      return
    }
    const totalCardsSum = Object.values(dailyAggregatedResult).reduce(
      (sum, entry) => sum + ((entry as AggregatedResult)?.totalLearnedCards || 0),
      0
    )

    const totalDurationMins = Object.values(dailyAggregatedResult).reduce(
      (sum, entry) => sum + ((entry as AggregatedResult).totalDurationMins || 0),
      0
    )

    const totalDays = Object.keys(dailyAggregatedResult).length

    console.log({
      totalCardsSum,
      studyPlanForCatalog,
      studyPlanCards: studyPlanForCatalog[0]?.wordsPerDay,
      totalDurationMins,
    })

    if (Number(totalCardsSum) >= Number(studyPlanForCatalog[0]?.wordsPerDay)) {
      handleCardSuccess()
    }

    const requiredStudyTime = studyPlanForCatalog[0]?.secondsPerDay
      ? Number((Number(studyPlanForCatalog[0].secondsPerDay) / 60).toFixed(2))
      : 0

    console.log({ requiredStudyTime })

    if (totalDurationMins && Number(totalDurationMins) >= requiredStudyTime) {
      handleTimeSuccess()
    }

    console.log({ totalDays })
    console.log({ dailyAggregatedResult, studyPlanForCatalog })

    if (Number(totalDays) >= Number(studyPlanForCatalog[0]?.daysPerWeek)) {
      handleWeeklySuccess()
    }
  }, [dailyAggregatedResult, studyPlanForCatalog])

  useEffect(() => {
    const fetchUpdatedCatalog = async () => {
      const updatedCatalog = await fetch(`/api/catalog/${catalog?.catalogId}`).then((res) =>
        res.json()
      )
      setCatalogDrawers(updatedCatalog.drawers)
      setCardCounts(updatedCatalog.drawers.map((drawer) => drawer.numberOfCards))
    }

    if (cardCounts?.some((count, index) => count !== drawers?.[index]?.numberOfCards)) {
      fetchUpdatedCatalog().catch(console.error)
    }
  }, [catalog?.catalogId, cardCounts, drawers])

  useEffect(() => {
    console.log({ cardCounts, catalogCards: catalog?.numberOfCards })
  }, [cardCounts, catalog?.numberOfCards])

  const catalogItems = cards.map((c) => (
    <CatalogCard
      key={c.cardId}
      imageUrl={c.imageUrl}
      term={c.term}
      description={c.description}
      owner={catalog?.owner || { id: "", email: "", imageUrl: null, name: null }}
      cardId={c.cardId}
      catalogId={c.catalogId}
      onDelete={handleCardDelete}
    />
  ))

  useEffect(() => {
    console.log({
      completionPercentage,
      completionDate: studyPlanForCatalog[0]?.completionDate,
    })
    if (
      Number(completionPercentage) === 100 &&
      studyPlanForCatalog[0]?.completionDate &&
      isDateWithinRange(studyPlanForCatalog[0].completionDate)
    ) {
      console.log(true)
      handleStudyPlanSuccess()
    }
  }, [completionPercentage])

  return (
    <Layout title={`Catalog ${catalog?.name}`}>
      <main className={styles.main}>
        <CatalogHeader
          header={`Catalog ${catalog?.name}`}
          link={Routes.AddCard({ id: catalog?.catalogId as string })}
          ownerId={catalog?.ownerId}
          settings
          catalogId={catalog?.catalogId}
        />
        <Box>
          <h2>Drawers:</h2>
          <Flex m="0 auto" gap="8px" miw="100%" className={styles.drawersContainer}>
            {catalog?.drawers.map((drawer, index) => (
              <DrawerCard
                key={drawer?.drawerId as string}
                id={drawer?.drawerId as string}
                header={`${index + 1} level`}
                frequency={frequencyDictionary[drawer?.frequency!]}
                color={frequencyColorMap[drawer?.frequency!]}
                numberOfCards={drawers?.[index]?.numberOfCards}
              />
            ))}
          </Flex>
        </Box>
        <h2>All cards:</h2>
        <div className={styles.filters}>
          <Flex align="center" justify="space-between">
            <label
              style={{ fontSize: "var(--mantine-font-size-sm)", fontWeight: 500 }}
              htmlFor="search"
            >
              Search:
            </label>
            <Box w="240px">
              <TextInput value={searchValue} onChange={handleTextChange} id="search" />
            </Box>
          </Flex>
          <Flex align={"center"} justify={"space-between"}>
            <label
              style={{
                fontSize: "var(--mantine-font-size-sm)",
                fontWeight: 500,
              }}
            >
              Sort by:
            </label>
            <Box w="270px">
              <Picker options={sortBy} hideImages onChange={handleSortChange} id="sort" />
            </Box>
          </Flex>
        </div>
        <div className={styles.gridCatalogs}>{catalogItems}</div>
      </main>
    </Layout>
  )
}

export const getServerSideProps = gSSP(async ({ params, query, ctx }) => {
  const id = (params as CatalogSchema).id
  const catalog = await getCatalog({ id }, ctx)
  const allStudyPlans = await getStudyPlans({ id }, ctx)
  const studyPlanForCatalog = allStudyPlans.filter((sp) => sp.catalogId === id)
  const learnSessions = await getLearnSessions(
    {
      userId: ctx?.session?.userId as string,
      catalogId: id,
    },
    ctx
  )

  const { formattedDate, lastMonday, nextSunday } = getDateHelpers()

  console.log({ formattedDate, lastMonday, nextSunday })

  const todaySessions = filterSessionByDate(learnSessions, formattedDate)
  const weeklySessions = filterSessionsByRange(learnSessions, lastMonday, nextSunday)

  const dailyAggregatedResult = getDailyAggregatedResult(todaySessions || [])
  const weeklyAggregatedResult = getWeeklyAggregatedResult(weeklySessions || [])
  console.log({ weeklySessions, weeklyAggregatedResult })

  const completionPercentage = getCompletionPercentage(catalog)

  return {
    props: {
      catalog,
      query,
      dailyAggregatedResult,
      studyPlanForCatalog,
      completionPercentage,
      weeklyAggregatedResult,
    },
  }
})

export default CatalogId
