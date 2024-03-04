import { Routes } from "@blitzjs/next"
import { RingProgress, Text, Paper, Center, Group, Flex, Button } from "@mantine/core"
import Link from "next/link"

const data = [
  {
    label: "Your score",
    stats: "78%",
    progress: 78,
    color: "var(--main-color)",
    correct: 7,
    wrong: 3,
    all: 10,
  },
] as const

export function Stats() {
  const stats = data.map((stat) => {
    return (
      <Paper withBorder radius="md" p="xs" key={stat.label} w="400px" m="0 auto">
        <Group pb="16px">
          <Text size="md" tt="uppercase" fw={700} m="0 auto" py="16px">
            {stat.label}
          </Text>
        </Group>
        <RingProgress
          size={160}
          roundCaps
          thickness={8}
          sections={[{ value: stat.progress, color: stat.color }]}
          m="0 auto"
          label={
            <Center>
              <Text fw={700} size="xl">
                {stat.stats}
              </Text>
            </Center>
          }
        />
        <Flex direction="column" m="16px">
          <Text size="xs" tt="uppercase" fw={700} m="0 auto" py="8px">
            correct: {stat.correct}
          </Text>
          <Text size="xs" tt="uppercase" fw={700} m="0 auto" py="8px">
            wrong: {stat.wrong}
          </Text>
          <Text size="xs" tt="uppercase" fw={700} m="0 auto" py="8px">
            all rehearseds: {stat.all}
          </Text>
        </Flex>
        <Group justify="center">
          <Link href={Routes.PublicCatalouges()}>
            <Button color="var(--main-color)">Back to catalogues</Button>
          </Link>
          <Link href={Routes.Cards()}>
            <Button color="var(--main-color)" variant="light">
              Try again
            </Button>
          </Link>
        </Group>
      </Paper>
    )
  })
  return stats
}
