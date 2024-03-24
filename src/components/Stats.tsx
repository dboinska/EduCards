import Layout from "@/core/layouts/Layout"
import { Routes } from "@blitzjs/next"
import { RingProgress, Text, Paper, Center, Group, Flex, Button } from "@mantine/core"
import Link from "next/link"

export function Stats({ correct, wrong }) {
  const all: number = Number(correct + wrong)
  const percent: number = Number(((correct / all) * 100).toFixed(0))
  const color = (percent: number): string => {
    if (percent < 50) {
      return "var(--mantine-color-red-6)"
    } else if (percent < 80) {
      return "var(--mantine-color-orange-6)"
    } else {
      return "var(--mantine-color-green-6)"
    }
  }

  const stats = () => {
    return (
      <Paper withBorder radius="lg" p="xs" m="0 auto" w="310px">
        <Group pb="16px">
          <Text size="md" tt="uppercase" fw={700} m="0 auto" py="16px">
            {"Your score"}
          </Text>
        </Group>
        <RingProgress
          size={160}
          roundCaps
          thickness={8}
          sections={[
            {
              value: percent,
              color: color(percent),
            },
          ]}
          m="0 auto"
          label={
            <Center>
              <Text fw={700} size="xl">
                {`${percent} %`}
              </Text>
            </Center>
          }
        />
        <Flex direction="column" m="16px">
          <Text size="xs" tt="uppercase" fw={700} m="0 auto" py="8px">
            correct: {correct}
          </Text>
          <Text size="xs" tt="uppercase" fw={700} m="0 auto" py="8px">
            wrong: {wrong}
          </Text>
          <Text size="xs" tt="uppercase" fw={700} m="0 auto" py="8px">
            all rehearseds: {all}
          </Text>
        </Flex>
        <Group justify="center" py="12px">
          <Link href={Routes.Catalogs()}>
            <Button color="var(--main-color)" variant="light" radius="md">
              Back to catalogs
            </Button>
          </Link>
          <Link href={Routes.Cards()}>
            <Button color="var(--main-color)" radius="md">
              Try again
            </Button>
          </Link>
        </Group>
      </Paper>
    )
  }

  return (
    <Layout title="Public catalogs">
      <Flex h="calc(100vh - 220px)" justify="center" align="center" mt="70px">
        {stats()}
      </Flex>
    </Layout>
  )
}
