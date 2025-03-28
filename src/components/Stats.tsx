import Layout from "@/layouts/Root.layout"
import { Routes } from "@blitzjs/next"
import { Text, Paper, Group, Flex, Button } from "@mantine/core"
import Link from "next/link"
import { Progress } from "./Progress"
import { useSession } from "@blitzjs/auth"

interface StatsProps {
  correct: number
  wrong: number
  newAttemptId: string
  currentItemId: string
  backButtonLabel: string
  backButtonHref?: any
  onClick?: () => void
}

export function Stats({
  correct,
  wrong,
  newAttemptId,
  backButtonLabel,
  backButtonHref,
  onClick,
}: StatsProps) {
  const session = useSession({ suspense: false })
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
  return (
    <Layout title="Public catalogs">
      <Flex h="calc(100vh - 220px)" justify="center" align="center" mt="70px">
        <Paper withBorder radius="lg" p="xs" m="0 auto" w="310px">
          <Group pb="16px">
            <Text size="md" tt="uppercase" fw={700} m="0 auto" py="16px">
              {"Your score"}
            </Text>
          </Group>
          <Progress
            percent={percent}
            color={color(percent)}
            text={`${percent} %`}
            size={160}
            textSize="lg"
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
            {backButtonHref ? (
              <Button
                component={Link}
                color="var(--main-color)"
                variant="light"
                radius="md"
                href={backButtonHref}
              >
                {backButtonLabel}
              </Button>
            ) : (
              <Button color="var(--main-color)" variant="light" radius="md" onClick={onClick}>
                {backButtonLabel}
              </Button>
            )}
            {session.userId && (
              <Link href={Routes.LearnPage({ id: newAttemptId as string })} passHref>
                <Button color="var(--main-color)" radius="md">
                  Try again
                </Button>
              </Link>
            )}
          </Group>
        </Paper>
      </Flex>
    </Layout>
  )
}
