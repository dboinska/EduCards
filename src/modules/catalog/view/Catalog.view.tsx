import { useState, useReducer, useEffect } from "react"
import { useRouter } from "next/router"
import { Routes } from "@blitzjs/next"
import { useSession } from "@blitzjs/auth"
import { useDebouncedCallback } from "@mantine/hooks"
import { showNotification } from "@mantine/notifications"
import { Box, Flex, TextInput } from "@mantine/core"

import trophyAnimation from "public/animations/trophy.json"
import checkAnimation from "public/animations/check.json"
import starAnimation from "public/animations/star.json"
import achievementAnimation from "public/animations/achievement.json"

import Layout from "@/layouts/Root.layout"
import LottieAnimation from "@/components/LottieAnimation"
import { CatalogHeader } from "@/components/CatalogHeader"
import { CatalogCard } from "@/components/CatalogCard"
import { DrawerCard } from "@/components/DrawerCard"
import { Picker } from "@/components/Picker"

import { actionTypes, catalogReducer, initialState } from "../reducers/catalogReducer"

import { frequencyColorMap, frequencyDictionary } from "@/utils/frequency"
import { isDateWithinRange } from "@/utils/isDateWithinRange"
import { sortBy } from "@/utils/sortBy"

import type { ParsedUrlQuery } from "node:querystring"
import type { Catalog, Drawer, Card, User } from "db"
import type { AggregatedResult } from "@/types/AggregatedResult"
import type { SortType } from "@/types/SortType"
import type { PickerOption } from "@/types/PickerOption"

import styles from "@/styles/Catalogs.module.css"

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

interface EnhacedCatalog extends Catalog {
  drawers: Drawer[]
  cards: Card[]
  owner: User | null
}

interface CatalogViewProps {
  query: ParsedUrlQuery
  catalog: EnhacedCatalog
  dailyAggregatedResult?: Record<string, AggregatedResult>
  studyPlanForCatalog?: any
  completionPercentage?: number | string
}

export const CatalogView = ({
  query,
  catalog,
  dailyAggregatedResult,
  studyPlanForCatalog,
  completionPercentage,
}: CatalogViewProps) => {
  const router = useRouter()
  const [state, dispatch] = useReducer(catalogReducer, {
    ...initialState,
    ...(query.query ? { query: decodeURI(query.query as string) } : {}),
    ...(query.sort ? { sort: decodeURI(query.sort as string) as SortType } : {}),
  })
  const [searchValue, setSearchValue] = useState(() => query.query || "")
  const [_catalogDrawers, setCatalogDrawers] = useState(catalog?.drawers || [])

  useEffect(() => {
    dispatch({
      type: actionTypes.setData,
      payload: {
        data: catalog?.cards || [],
      },
    })
  }, [])

  const drawers = catalog?.drawers

  console.log({ drawers })

  const [cardCounts, setCardCounts] = useState(drawers?.map((drawer) => drawer?.numberOfCards))

  const { handleStudyPlanSuccess, handleTimeSuccess, handleCardSuccess, handleWeeklySuccess } =
    useNotifications()

  const handleCardDelete = (cardId: string) => {
    dispatch({
      type: actionTypes.removeCard,
      payload: { cardId },
    })
  }

  const session = useSession({ suspense: false })

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
      query: {
        id: router.query.id,
        ...(query.length > 0 && {
          query: encodeURIComponent(query),
        }),
      },
    }

    await router.push(routerQuery)
  }, 500)

  useEffect(() => {
    if (!dailyAggregatedResult && !studyPlanForCatalog) {
      return
    }

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

    if (Number(totalCardsSum) >= Number(studyPlanForCatalog[0]?.wordsPerDay)) {
      handleCardSuccess()
    }

    const requiredStudyTime = studyPlanForCatalog[0]?.secondsPerDay
      ? Number((Number(studyPlanForCatalog[0].secondsPerDay) / 60).toFixed(2))
      : 0

    if (totalDurationMins && Number(totalDurationMins) >= requiredStudyTime) {
      handleTimeSuccess()
    }

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
    if (!completionPercentage) {
      return
    }

    if (
      Number(completionPercentage) === 100 &&
      studyPlanForCatalog[0]?.completionDate &&
      isDateWithinRange(studyPlanForCatalog[0].completionDate)
    ) {
      handleStudyPlanSuccess()
    }
  }, [completionPercentage])
  console.log({ catalogId: catalog?.catalogId, catalog })

  const drawerId = (catalog?.drawers[0]?.drawerId as string) ?? ""

  const catalogId = catalog.catalogId ?? ""
  return (
    <Layout title={`Catalog ${catalog?.name}`}>
      <main className={styles.main}>
        {!session?.userId ? (
          <CatalogHeader
            header={"Catalog xfdgfg"}
            learningMode
            drawerId={drawerId}
            catalogId={catalogId}
          />
        ) : (
          <CatalogHeader
            header={`Catalog ${catalog?.name}`}
            link={Routes.AddCard({ id: catalog?.catalogId as string })}
            ownerId={catalog?.ownerId}
            settings
            catalogId={catalog?.catalogId}
          />
        )}

        {session.userId && (
          <Box>
            {Number(catalog?.amountOfDrawers) > 0 && Number(catalog?.cards) > 0 && (
              <h2>Drawers:</h2>
            )}
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
        )}
        <>
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
                <Picker options={sortBy} onChange={handleSortChange} id="sort" />
              </Box>
            </Flex>
          </div>

          {state.filteredData.length > 0 && (
            <div className={styles.gridCatalogs}>
              {state.filteredData.map((c) => (
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
              ))}
            </div>
          )}

          {state.filteredData.length === 0 && (
            <div className={styles.noResults}>
              <h2>No results found</h2>
            </div>
          )}
        </>
      </main>
    </Layout>
  )
}
