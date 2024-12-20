import Layout from "@/layouts/Root.layout"
import { BlitzPage, Routes } from "@blitzjs/next"
import styles from "src/styles/Catalogs.module.css"
import { Box, Flex, Badge, Group, Text, Grid, useMantineTheme } from "@mantine/core"
import { CatalogHeader } from "@/components/CatalogHeader"
import { Progress } from "@/components/Progress"
import { IconCards, IconClockHour2, IconPuzzle, IconCalendarMonth } from "@tabler/icons-react"
import BarChart from "@/components/BarChart"
import PieChart from "@/components/PieChart"
import { useCurrentUser } from "@/modules/user/hooks/useCurrentUser"

export interface StatisticsProps {
  id: number
  authorId: number
}

const data = [
  {
    header: "Study days",
    label: "Every day",
    icon: <IconCalendarMonth />,
    value: "1.5h",
  },
  {
    header: "Total time",
    label: "Every day",
    icon: <IconClockHour2 />,
    value: "1.5h",
  },
  {
    header: "Learned cards",
    label: "Every day",
    icon: <IconCards />,
    value: 223,
  },
  {
    header: "Completed quizzes",
    label: "Every day",
    icon: <IconPuzzle />,
    value: 4,
  },
]

const barChartTime = {
  labels: ["Mon.", "Tue.", "Wed.", "Thu.", "Fri.", "Sat.", "Sun."],
  datasets: [
    {
      label: "Learned cards",
      data: [10, 11, 7, 8, 9, 15, 11],
      backgroundColor: "#74c0fc",
      borderColor: "#4dabf7",
      borderWidth: 1,
      barThickness: 20,
    },
  ],
}

const barChartCards = {
  labels: ["Mon.", "Tue.", "Wed.", "Thu.", "Fri.", "Sat.", "Sun."],
  datasets: [
    {
      label: "Time [m]",
      data: [30, 15, 5, 15, 10, 30, 7],
      backgroundColor: "#c0eb75",
      borderColor: "#a9e34b",
      borderWidth: 1,
      barThickness: 20,
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
      // text: "Card Chart",
    },
  },
}

const pieChartLabel = ["1 level", "2 level", "3 level", "4 level", "5 level", "6 level", "7 level"]

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

const StudyPlan: BlitzPage = ({ id, authorId }: StatisticsProps) => {
  const currentUser = useCurrentUser()
  const theme = useMantineTheme()
  const pieChartData = {
    labels: pieChartLabel,
    datasets: [
      {
        label: "# of Votes",
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          theme.colors.pink[3],
          theme.colors.blue[3],
          theme.colors.yellow[3],
          theme.colors.lime[3],
          theme.colors.violet[3],
          theme.colors.orange[3],
        ],
        borderColor: [
          theme.colors.pink[4],
          theme.colors.blue[4],
          theme.colors.yellow[4],
          theme.colors.lime[4],
          theme.colors.violet[4],
          theme.colors.orange[4],
        ],
        borderWidth: 1,
        cutout: "65%",
      },
    ],
  }

  return (
    <Layout title="Study Plan">
      <main className={styles.main}>
        <CatalogHeader ownerId={currentUser?.id} header={"Study Plan XYZ"} studyPlanMode />
        <Flex justify="space-between" my="var(--mantine-spacing-sm)" wrap="wrap" gap="md">
          <Flex gap="var(--mantine-spacing-xs)">
            <Badge color="var(--mantine-color-gray-6)">Started: 03.03.2024</Badge>
            <Badge variant="outline" color="var(--mantine-color-gray-6)">
              Planned end: 23.05.2024
            </Badge>
          </Flex>
          <Flex gap="var(--mantine-spacing-xs)" wrap="wrap">
            <Badge variant="outline" color="var(--mantine-color-red-6)">
              Active cards: 3
            </Badge>
            <Badge variant="outline" color="var(--mantine-color-green-6)">
              Learned cards: 76
            </Badge>
            <Badge color="var(--mantine-color-blue-6)">All cards: 76</Badge>
          </Flex>
        </Flex>
        <Grid justify="center" align="stretch" my="var(--mantine-spacing-lg)">
          <Grid.Col span={{ base: 12, md: 5 }}>
            <Flex direction="column" h="100%" justify="space-between">
              <Flex direction="column" className="border" p="var(--mantine-spacing-md)">
                <Group>
                  <h3>Today&apos;s learning</h3>
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
                <Group py="16px">
                  <Text size="sm" fw={700} m="0 auto">
                    of your 6-day target
                  </Text>
                </Group>
              </Box>
            </Flex>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 7 }}>
            <Box p="var(--mantine-spacing-md)" className="border" h="100%">
              <h3>Last week</h3>
              <Flex mah="240px" justify="center" gap="sm" direction="column" align="center">
                <BarChart data={barChartTime} options={barChartOptions} />
              </Flex>
              <Flex mah="240px" justify="center" gap="sm" direction="column" align="center">
                <BarChart data={barChartCards} options={barChartOptions} />
              </Flex>
            </Box>
          </Grid.Col>
        </Grid>

        <Grid justify="center" align="stretch">
          <Grid.Col span={{ base: 12, md: 7 }}>
            <Flex direction="column" h="100%">
              <Flex direction="column" className="border" p="var(--mantine-spacing-md)" h="100%">
                <h3>General</h3>
                <Box>{lastSession()}</Box>
              </Flex>
            </Flex>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 5 }}>
            <Box p="var(--mantine-spacing-md)" className="border" h="100%">
              <h3>Card levels</h3>
              <PieChart data={pieChartData} />
            </Box>
          </Grid.Col>
        </Grid>
      </main>
    </Layout>
  )
}

export default StudyPlan
