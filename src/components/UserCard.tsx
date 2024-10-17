import { Card, Avatar, Text, Group, Button, Radio, CheckIcon, Box } from "@mantine/core"
import classes from "/src/styles/UserCard.module.css"
import { Routes } from "@blitzjs/next"
import Link from "next/link"
import { useCurrentUser } from "@/users/hooks/useCurrentUser"
import { IconSettings } from "@tabler/icons-react"
import { useState } from "react"
import styles from "src/styles/Catalogs.module.css"

export function UserCard({
  query,
  user,
  totalCards,
  totalCatalogs,
  totalFavorites,
}: {
  query: any
  user: any
  totalCards: any
  totalCatalogs: any
}) {
  const currentUser = useCurrentUser()

  const [backgroundImage, setBackgroundImage] = useState(
    user.cover
      ? `url(${user.cover})`
      : "url(https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80)"
  )

  console.log({ query, user, cover: user?.cover })

  const stats = [
    { value: totalCatalogs, label: "Catalogs" },
    { value: totalCards, label: "Cards" },
    { value: totalFavorites, label: "Favorites" },
  ]

  const items = stats.map((stat) => (
    <div key={stat.label}>
      <Text ta="center" fz="lg" fw={500}>
        {stat.value}
      </Text>
      <Text ta="center" fz="sm" c="dimmed" lh={1}>
        {stat.label}
      </Text>
    </div>
  ))

  return (
    <Card withBorder padding="xl" radius="var(--mantine-spacing-md)" className={classes.card}>
      <Card.Section
        h={200}
        style={{
          backgroundImage: backgroundImage,
        }}
        className={classes.cardBackground}
      ></Card.Section>
      <Avatar
        src={currentUser?.imageUrl}
        size={80}
        radius={80}
        mx="auto"
        mt={-30}
        className={classes.avatar}
        style={{ backgroundColor: "white" }}
      />
      <Box w="100%" m="0 auto" align="center" pos="relative">
        <Text ta="center" fz="lg" fw={500} mt="sm">
          {currentUser?.name}
        </Text>
        <Text ta="center" fz="sm" c="dimmed">
          {currentUser?.email}
        </Text>
        <Group mt="md" justify="center" gap={30}>
          {items}
        </Group>

        <Button
          component={Link}
          href={Routes.NewStudyPlan()}
          fullWidth
          radius="md"
          my="xl"
          size="md"
          variant="filled"
          maw="260px"
        >
          Create your new study plan
        </Button>
        <Radio
          icon={CheckIcon}
          label="Set profile as a public to receive shared resources"
          name="check"
          checked={currentUser?.isPublic}
          disabled={!currentUser?.isPublic}
          style={{ pointerEvents: "none" }}
          color="lime.4"
          maw="380px"
        />

        <Button
          p="0 2px"
          w="24"
          h="24"
          radius="xl"
          className={styles.iconSettings}
          variant="transparent"
          color="var(--mantine-color-gray-8)"
          style={{ position: "absolute", top: "-20px", right: "-12px", border: "none" }}
          component={Link}
          href={Routes.EditProfile()}
        >
          <IconSettings />
        </Button>
      </Box>
    </Card>
  )
}
