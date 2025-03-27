import Layout from "@/layouts/Root.layout"
import styles from "src/styles/Catalogs.module.css"
import { Box, Flex, Group, Text, Grid, BackgroundImage } from "@mantine/core"
import { useCurrentUser } from "@/modules/user/hooks/useCurrentUser"

import { Progress } from "@/components/Progress"
import {
  IconCards,
  IconCirclePlus,
  IconClockHour2,
  IconFolder,
  IconPuzzle,
} from "@tabler/icons-react"
import BarChart from "@/components/BarChart"
import PieChart from "@/components/PieChart"
import { DynamicBadge } from "@/components/DynamicBadge"

import { useMantineTheme } from "@mantine/core"
import { useQuery } from "@blitzjs/rpc"
import getDailyLearning from "../queries/getDailyLearning"
import getWeeksLearning from "../queries/getWeeklyLearning"
import { startOfWeek } from "date-fns"
import getWeeksLearnedCards from "../../card/queries/getWeeklyLearnedCards"
import getLastSessionStatistics from "@/modules/user/queries/getLastSessionStatistics"
import getLastWeekStatistics from "../queries/getWeeklyStatistics"
import getActiveStudyPlans from "../queries/getActiveStudyPlans"
import getWeeksCatalogs from "../../catalog/queries/getWeeklyCatalogs"
import getDailyCompletedQuizzes from "@/modules/quiz/queries/getDailyCompletedQuizzes"
import getWeeklyCompletedQuizzes from "@/modules/quiz/queries/getWeeklyCompletedQuizzes"
import getWeeklyAddedCards from "../../card/queries/getWeeklyAddedCards"
import getDailySuggestions from "@/modules/suggestion/queries/getDailySuggestions"
import getWeeklySuggestions from "@/modules/suggestion/queries/getWeeklySuggestions"
import { useMemo } from "react"

export interface StatisticsViewProps {
  id?: string
  image?: string
  header?: string
  desc?: string
  isFavorite?: boolean
  authorId?: number
}

const WEEKDAYS = ["Mon.", "Tue.", "Wed.", "Thu.", "Fri.", "Sat.", "Sun."]
const today = new Date()
const weekStart = startOfWeek(today, { weekStartsOn: 1 })

interface StudyPlanBadge {
  color: string
  header: string
  label: string
  percent: number
}

interface StudyPlan {
  id: string
  name: string
  daysPerWeek: number
  secondsPerDay: number
  wordsPerDay: number
  createdAt: Date
  updatedAt: Date
  completionDate: Date
  catalogId: string
  color: string
  ownerId: string
  active: boolean
}

function convertStudyPlanToBadge(studyPlan: StudyPlan): StudyPlanBadge {
  return {
    color: studyPlan.color,
    header: studyPlan.name,
    label: `${studyPlan.daysPerWeek} days/week`,
    percent: Number(((studyPlan.wordsPerDay / studyPlan.secondsPerDay) * 100).toFixed(2)),
  }
}

const barChartOptions = {
  scales: {
    y: {
      beginAtZero: true,
    },
  },
  plugins: {
    legend: {
      display: true,
    },
    title: {
      display: true,
      text: "Card Chart",
    },
  },
}

export const UserStatisticsView = ({ id }: StatisticsViewProps) => {
  const currentUser = useCurrentUser()
  const [lastSessionStatistics] = useQuery(getLastSessionStatistics, currentUser?.id as string)
  const [lastWeekStatistics] = useQuery(getLastWeekStatistics, currentUser?.id as string)
  const [todaysLearning] = useQuery(getDailyLearning, {})
  const [weeksLearning] = useQuery(getWeeksLearning, {})
  const [weeksCards] = useQuery(getWeeklyAddedCards, {})
  const [weeksLearnedCards] = useQuery(getWeeksLearnedCards, {})
  const studyPlans = useQuery(getActiveStudyPlans, {})

  const studyPlansData = studyPlans[0]?.studyPlans
    ? studyPlans[0].studyPlans.map(convertStudyPlanToBadge)
    : []
  const practicedCatalogs = useQuery(getWeeksCatalogs, {})

  const dailyCompletedQuizzes = useQuery(getDailyCompletedQuizzes, {
    userId: currentUser!.id,
  })
  const weeklyCompletedQuizzes = useQuery(getWeeklyCompletedQuizzes, {
    userId: currentUser?.id as string,
  })
  const dailySuggestions = useQuery(getDailySuggestions, {
    userId: currentUser?.id as string,
  })
  const weeklySuggestions = useQuery(getWeeklySuggestions, {
    userId: currentUser?.id as string,
  })

  const lastSession = lastSessionStatistics || {}
  const addedCardsByDay = Array(7).fill(0)
  weeksCards?.forEach((day) => {
    const dayIndex = new Date(day.createdAt).getDay()
    const adjustedIndex = dayIndex === 0 ? 6 : dayIndex - 1
    addedCardsByDay[adjustedIndex] += 1
  })

  const learnedCardsByDay = Array(7).fill(0)
  weeksLearnedCards?.forEach((day) => {
    const dayIndex = new Date(day.date).getDay()
    const adjustedIndex = dayIndex === 0 ? 6 : dayIndex - 1
    learnedCardsByDay[adjustedIndex] = day.learnedCards
  })

  const lastSessionData = [
    {
      header: "Time",
      label: "Total learning duration in minutes",
      icon: <IconClockHour2 />,
      value: `${lastSession?.duration || 0}`,
    },
    {
      header: "Cards",
      label: "Amount of studied cards",
      icon: <IconCards />,
      value: lastSession?.learnedCards,
    },
    {
      header: "Used suggestions",
      label: "New hints added",
      icon: <IconCirclePlus />,
      value: dailySuggestions[0]?.length,
    },
    {
      header: "Catalogs",
      label: "Practiced catalogs",
      icon: <IconFolder />,
      value: lastSession?.totalCatalogs,
    },
    {
      header: "Quizzes",
      label: "Knowledge checks completed",
      icon: <IconPuzzle />,
      value: dailyCompletedQuizzes[0]?.length,
    },
  ]

  const lastWeekData = [
    {
      header: "Time",
      label: "Total learning duration in minutes",
      icon: <IconClockHour2 />,
      value: lastWeekStatistics?.duration,
    },
    {
      header: "Cards",
      label: "Amount of studied cards",
      icon: <IconCards />,
      value: lastWeekStatistics?.learnedCards,
    },
    {
      header: "Used suggestions",
      label: "New hints added",
      icon: <IconCirclePlus />,
      value: weeklySuggestions[0]?.length,
    },
    {
      header: "Catalogs",
      label: "Practiced catalogs",
      icon: <IconFolder />,
      value: lastWeekStatistics?.totalCatalogs,
    },
    {
      header: "Quizzes",
      label: "Knowledge checks completed",
      icon: <IconPuzzle />,
      value: weeklyCompletedQuizzes[0]?.length,
    },
  ]

  const overviewItems = (data) => {
    const items = data.map((data, index) => (
      <Flex key={index} my="var(--mantine-spacing-sm)" gap="var(--mantine-spacing-md)">
        <Flex className="border" p="var(--mantine-spacing-md) " align="center">
          {data.icon}
        </Flex>
        <Flex w="70%" justify="space-between">
          <Flex direction="column">
            <h3 style={{ margin: 0 }}>{data.header}</h3>
            <h4
              style={{
                margin: 0,
                fontSize: "var(--mantine-font-size-sm)",
                color: "var(--mantine-color-gray-6)",
              }}
            >
              {data.label}
            </h4>
          </Flex>
          <h4
            style={{
              color: "var(--mantine-color-blue-6",
              fontSize: "var(--mantine-font-size-md",
            }}
          >
            {data.value}
          </h4>
        </Flex>
      </Flex>
    ))
    return items
  }

  const theme = useMantineTheme()
  const barChartData = {
    labels: ["Mon.", "Tue.", "Wed.", "Thu.", "Fri.", "Sat.", "Sun."],
    datasets: [
      {
        label: "Learned",
        data: learnedCardsByDay,
        backgroundColor: "#c0eb75",
        borderColor: "#a9e34b",
        borderWidth: 1,
        barThickness: 12,
      },
      {
        label: "Added",
        data: addedCardsByDay,
        backgroundColor: "#74c0fc",
        borderColor: "#4dabf7",
        borderWidth: 1,
        barThickness: 12,
      },
    ],
  }

  const catalogsData = practicedCatalogs?.[0]

  const filteredData = catalogsData
    .filter((catalog) => catalog && catalog.catalogName && catalog.duration > 0)
    .sort((a, b) => b.duration - a.duration)

  const pieChartData = {
    labels: filteredData.map((catalog) => catalog.catalogName),
    datasets: [
      {
        label: filteredData.map((catalog) => catalog.catalogName),
        data: filteredData.map((catalog) => catalog.duration),
        backgroundColor: [
          theme.colors.blue[4],
          theme.colors.cyan[4],
          theme.colors.grape[4],
          theme.colors.green[4],
          theme.colors.indigo[4],
          theme.colors.orange[4],
          theme.colors.pink[4],
          theme.colors.red[4],
          theme.colors.teal[4],
          theme.colors.violet[4],
          theme.colors.yellow[4],
        ].slice(0, filteredData.length),
        borderColor: [
          theme.colors.blue[6],
          theme.colors.cyan[6],
          theme.colors.grape[6],
          theme.colors.green[6],
          theme.colors.indigo[6],
          theme.colors.orange[6],
          theme.colors.pink[6],
          theme.colors.red[6],
          theme.colors.teal[6],
          theme.colors.violet[6],
          theme.colors.yellow[6],
        ].slice(0, filteredData.length),
        borderWidth: 1,
        cutout: "65%",
      },
    ],
  }

  const pieChartOptions = {
    plugins: {
      legend: {
        display: true,
        position: "bottom",
        labels: {
          usePointStyle: true,
          padding: 20,
          boxWidth: 20,
          boxHeight: 20,
          font: {
            size: 12,
          },
          generateLabels: (chart) => {
            const datasets = chart.data.datasets[0]
            const labels = chart.data.labels

            return labels.map((label, i) => ({
              text: label,
              fillStyle: datasets.backgroundColor[i],
              strokeStyle: datasets.borderColor[i],
              lineWidth: 1,
              hidden: false,
              index: i,
            }))
          },
        },
      },
    },
    layout: {
      padding: {
        top: 10,
        bottom: 0,
      },
    },
  }

  return (
    <Layout title="Statistics">
      <main className={styles.main}>
        <h1 style={{ fontSize: "24px" }}>Statistics</h1>
        <Grid justify="center" align="stretch" gutter="lg" my="var(--mantine-spacing-lg)">
          <Grid.Col span={{ base: 12, md: 5 }}>
            <Flex direction="column">
              <Flex direction="column" className="border" p="var(--mantine-spacing-md)">
                <Group>
                  <h3>Today&apos;s learning</h3>
                </Group>
                <Progress
                  percent={todaysLearning.totalTime > 0 ? 100 : 0}
                  color="var(--mantine-color-blue-6)"
                  text={`${todaysLearning.totalTime || 0} ${
                    todaysLearning.totalTime !== 1 ? "mins" : "min"
                  }`}
                  size={160}
                  textSize="lg"
                />
                <Group py="16px">
                  <Text size="sm" fw={700} m="0 auto">
                    of today&apos;s learning sessions
                  </Text>
                </Group>
              </Flex>
              <Box
                className="border"
                p="var(--mantine-spacing-md)"
                my="var(--mantine-spacing-lg)"
                mb="0"
              >
                <Group>
                  <h3>This week&apos;s learning sessions</h3>
                </Group>
                <Flex gap="8px" justify="center">
                  {weeksLearning.weeklyTimes.map((time, index) => {
                    const currentDate = new Date(weekStart)
                    currentDate.setDate(weekStart.getDate() + index)

                    const isFutureDate = currentDate > today

                    return (
                      <Flex
                        key={index}
                        align="center"
                        direction="column"
                        style={{ opacity: isFutureDate ? 0.5 : 1 }}
                      >
                        <Text size="sm" fw={700} m="0 auto">
                          {WEEKDAYS[index]}
                        </Text>
                        <Progress
                          percent={isFutureDate ? 0 : Math.min(((time || 0) / 10) * 100, 100)}
                          color="var(--mantine-color-blue-6)"
                          size={40}
                          thickness={4}
                        />
                        <Text size="xs" fw="700" c="var(--mantine-color-gray-6)">
                          {isFutureDate
                            ? "-"
                            : `${time} ${time !== 1 && time !== 0 ? "mins" : "min"}`}
                        </Text>
                      </Flex>
                    )
                  })}
                </Flex>
              </Box>
            </Flex>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 7 }}>
            <Box p="var(--mantine-spacing-md)" className="border" h="100%">
              <h3>Login session overview</h3>
              <Box>{overviewItems(lastSessionData)}</Box>
            </Box>
          </Grid.Col>
        </Grid>
        <div>
          <Box
            className="border"
            w="100%"
            p="var(--mantine-spacing-md)"
            mb="var(--mantine-spacing-md)"
          >
            <h3>Active study plans</h3>

            <div className={`${styles.justifyLeft}`}>
              {studyPlansData.map((plan, index) => (
                <DynamicBadge
                  key={studyPlans[0]?.studyPlans[index]?.catalogId}
                  data={[plan]}
                  catalogId={studyPlans[0]?.studyPlans[index]?.catalogId || ""}
                />
              ))}
            </div>
          </Box>
        </div>
        <Flex w="100%">
          <Box className="border" w="100%" p="var(--mantine-spacing-md)">
            <h3>Overview</h3>
            <Flex mah="500px" justify="center">
              <BarChart data={barChartData} options={barChartOptions} />
            </Flex>
          </Box>
        </Flex>
        <Grid justify="center" align="stretch" gutter="lg" my="var(--mantine-spacing-lg)">
          <Grid.Col span={{ base: 12, md: 7 }}>
            <Flex direction="column">
              <Flex direction="column" className="border" p="var(--mantine-spacing-md)">
                <h3>Period mean- last week</h3>
                <Box>{overviewItems(lastWeekData)}</Box>
              </Flex>
            </Flex>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 5 }}>
            <Box p="var(--mantine-spacing-md)" className="border" h="100%">
              <h3>Catalogs practiced this week</h3>
              <PieChart data={pieChartData} options={pieChartOptions} />
            </Box>
          </Grid.Col>
        </Grid>
      </main>
    </Layout>
  )
}
