import Layout from "src/core/layouts/Layout"
import { BlitzPage } from "@blitzjs/next"
import styles from "src/styles/Catalogs.module.css"
import { Box, Flex, Group, Text, Grid } from "@mantine/core"
import { useCurrentUser } from "@/users/hooks/useCurrentUser"

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
import getStatistics from "./queries/getStatistics"

export interface StatisticsProps {
  id: number
  image?: string
  header: string
  desc?: string
  isFavorite?: boolean
  authorId: number
}

const data = [
  {
    header: "Time",
    label: "Every day",
    icon: <IconClockHour2 />,
    value: "1.5h",
  },
  {
    header: "Cards",
    label: "Every day",
    icon: <IconCards />,
    value: 223,
  },
  {
    header: "Used suggestions",
    label: "Every day",
    icon: <IconCirclePlus />,
    value: 12,
  },
  {
    header: "Catalogs",
    label: "Every day",
    icon: <IconFolder />,
    value: 1,
  },
  {
    header: "Quizzes",
    label: "Every day",
    icon: <IconPuzzle />,
    value: 4,
  },
]

const studyPlansData = [
  {
    color: "var(--mantine-color-yellow-6)",
    header: "English",
    label: "Grammar",
    percent: 30,
  },
  {
    color: "var(--mantine-color-lime-6)",
    header: "Polish",
    label: "Vocabulary",
    percent: 23,
  },
  {
    color: "var(--mantine-color-green-6)",
    header: "French",
    label: "Tenses",
    percent: 12,
  },
  {
    color: "var(--mantine-color-teal-6)",
    header: "Deutch",
    label: "Every week",
    percent: 11,
  },
  {
    color: "var(--mantine-color-yellow-6)",
    header: "English",
    label: "Grammar",
    percent: 30,
  },
  {
    color: "var(--mantine-color-lime-6)",
    header: "Polish",
    label: "Vocabulary",
    percent: 23,
  },
  {
    color: "var(--mantine-color-green-6)",
    header: "French",
    label: "Tenses",
    percent: 12,
  },
  {
    color: "var(--mantine-color-teal-6)",
    header: "Deutch",
    label: "Every week",
    percent: 11,
  },
]

const barChartData = {
  labels: ["Mon.", "Tue.", "Wed.", "Thu.", "Fri.", "Sat.", "Sun."],
  datasets: [
    {
      label: "Learned",
      data: [12, 19, 3, 5, 2, 3, 7],
      backgroundColor: "#c0eb75",
      borderColor: "#a9e34b",
      borderWidth: 1,
      barThickness: 12,
    },
    {
      label: "Added",
      data: [10, 11, 7, 8, 9, 15, 11],
      backgroundColor: "#74c0fc",
      borderColor: "#4dabf7",
      borderWidth: 1,
      barThickness: 12,
    },
  ],
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
const pieChartLabel = ["Catalog X", "Catalog Y", "Catalog Z"]

const lastSession = () => {
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

const Statistics: BlitzPage = ({
  id,
  image,
  header,
  desc,
  isFavorite,
  authorId,
}: StatisticsProps) => {
  const currentUser = useCurrentUser()
  const statistics = useQuery(getStatistics, {})
  console.log({ statistics })

  const theme = useMantineTheme()
  const pieChartData = {
    labels: pieChartLabel,
    datasets: [
      {
        label: "# of Votes",
        data: [12, 19, 3],
        backgroundColor: [theme.colors.pink[3], theme.colors.blue[3], theme.colors.yellow[3]],
        borderColor: [theme.colors.pink[4], theme.colors.blue[4], theme.colors.yellow[4]],
        borderWidth: 1,
        cutout: "65%",
      },
    ],
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
                  <h3>Today's learning</h3>
                </Group>
                <Progress
                  percent={100}
                  color="var(--mantine-color-blue-6)"
                  text={"30 min"}
                  size={160}
                  textSize="lg"
                />
                <Group py="16px">
                  <Text size="sm" fw={700} m="0 auto">
                    of your 5-minute target
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
                  <h3>This week</h3>
                </Group>
                <Flex my="var(--mantine-spacing-md)" justify="space-between">
                  <Flex align="center" direction="column">
                    <Text size="sm" fw={700} m="0 auto">
                      Mon.
                    </Text>
                    <Progress
                      percent={100}
                      color="var(--mantine-color-blue-6)"
                      size={40}
                      thickness={4}
                    />
                  </Flex>
                  <Flex align="center" direction="column">
                    <Text size="sm" fw={700} m="0 auto">
                      Tue.
                    </Text>
                    <Progress
                      percent={100}
                      color="var(--mantine-color-blue-6)"
                      size={40}
                      thickness={4}
                    />
                  </Flex>
                  <Flex align="center" direction="column">
                    <Text size="sm" fw={700} m="0 auto">
                      Wed.
                    </Text>
                    <Progress
                      percent={100}
                      color="var(--mantine-color-blue-6)"
                      size={40}
                      thickness={4}
                    />
                  </Flex>
                  <Flex align="center" direction="column">
                    <Text size="sm" fw={700} m="0 auto">
                      Thu.
                    </Text>
                    <Progress
                      percent={100}
                      color="var(--mantine-color-blue-6)"
                      size={40}
                      thickness={4}
                    />
                  </Flex>
                  <Flex align="center" direction="column">
                    <Text size="sm" fw={700} m="0 auto">
                      Fri.
                    </Text>
                    <Progress
                      percent={100}
                      color="var(--mantine-color-blue-6)"
                      size={40}
                      thickness={4}
                    />
                  </Flex>
                  <Flex align="center" direction="column">
                    <Text size="sm" fw={700} m="0 auto">
                      Sat.
                    </Text>
                    <Progress
                      percent={100}
                      color="var(--mantine-color-blue-6)"
                      size={40}
                      thickness={4}
                    />
                  </Flex>
                  <Flex align="center" direction="column">
                    <Text size="sm" fw={700} m="0 auto">
                      Sun.
                    </Text>
                    <Progress
                      percent={100}
                      color="var(--mantine-color-blue-6)"
                      size={40}
                      thickness={4}
                    />
                  </Flex>
                </Flex>
              </Box>
            </Flex>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 7 }}>
            <Box p="var(--mantine-spacing-md)" className="border" h="100%">
              <h3>Last session</h3>
              <Box>{lastSession()}</Box>
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

            <div className={`${styles.justifyLeft} ${styles.maxWidth600}`}>
              <DynamicBadge data={studyPlansData} />
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
                <h3>Period mean</h3>
                <Box>{lastSession()}</Box>
              </Flex>
            </Flex>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 5 }}>
            <Box p="var(--mantine-spacing-md)" className="border" h="100%">
              <h3>Practiced catalogs</h3>
              <PieChart data={pieChartData} />
            </Box>
          </Grid.Col>
        </Grid>
      </main>
    </Layout>
  )
}

export default Statistics
