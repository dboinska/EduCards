import { IconHeart, IconHeartFilled } from "@tabler/icons-react"
import { Card as MantineCard, Image, Text, Group, Badge, ActionIcon, Flex } from "@mantine/core"
import classes from "../styles/Cards.module.css"
import Layout from "@/core/layouts/Layout"
import { useCurrentUser } from "@/users/hooks/useCurrentUser"
import { useEffect, useState } from "react"

import { motion, useMotionValue, useTransform } from "framer-motion"

export interface CardProps {
  id: number
  image?: string
  header: string
  desc?: string
  catalouge?: string
  isFavourite?: boolean
  onMoveRight?: () => void
  onMoveLeft?: () => void
}

const Card = ({
  id,
  image,
  header,
  desc,
  catalouge,
  isFavourite,
  onMoveLeft,
  onMoveRight,
}: CardProps) => {
  const currentUser = useCurrentUser()

  const [reversedCard, setReversedCard] = useState<boolean>(false)

  const x = useMotionValue(0)
  const xInput = [-10, 0, 10]
  const [border, setBorder] = useState("8px solid transparent")
  const [backgroundColor, setBackgroundColor] = useState("transparent")
  const [iconDisplay, setIconDisplay] = useState("none")

  const [isSwiped, setIsSwiped] = useState(false)

  useEffect(() => {
    const unsubscribeX = x.on("change", (latestX) => {
      if (latestX <= -10) {
        setBorder(`3px solid var(--lime-color)`)
        setBackgroundColor("rgba(255,255,255,0.8)")
        setIconDisplay("flex")
        setIsSwiped(true)
      } else if (latestX >= 10) {
        setBorder(`3px solid var(--mantine-color-red-6) `)
        setBackgroundColor("rgba(255,255,255,0.8)")
        setIconDisplay("flex")
        setIsSwiped(true)
      } else {
        setBorder(`3px solid transparent`)
        setBackgroundColor("transparent")
        setIconDisplay("none")
      }
    })

    return () => {
      unsubscribeX()
    }
  }, [x])

  const [exitX, setExitX] = useState(0)

  const handlePanEndEvent = (event: PointerEvent, { offset }) => {
    if (reversedCard) setExitX(0)
    if (offset.x >= 25) {
      setExitX(window.innerWidth)
      if (onMoveRight) {
        onMoveRight()
      }
    } else if (offset.x <= -20) {
      setExitX(-window.innerWidth)
      if (onMoveLeft) {
        onMoveLeft()
      }
    }

    setIsSwiped(true)
  }

  useEffect(() => {
    if (isSwiped) {
      x.set(0)
    }

    setExitX(0)
  }, [isSwiped, reversedCard, x])

  const color = useTransform(x, xInput, ["var(--lime-color)", "rgba(0,0,0,0)", "#fa5252"])
  const tickPath = useTransform(x, [-0, -20], [0, 1])
  const crossPathA = useTransform(x, [0, 35], [0, 1])
  const crossPathB = useTransform(x, [25, 35], [0, 1])

  const favCard = currentUser ? (
    <ActionIcon variant="subtle" radius="md" size={26}>
      {isFavourite ? (
        <IconHeartFilled className={classes.like} stroke={2} />
      ) : (
        <IconHeart className={classes.like} stroke={2} />
      )}
    </ActionIcon>
  ) : null

  return (
    <Layout title="Public catalouges">
      <main className={classes.main}>
        {!reversedCard ? (
          <Flex justify="center" className={classes.cardContainer}>
            <motion.div className={classes.cardContainer}>
              <motion.div
                key={id}
                className="box"
                style={{
                  x,
                }}
                animate={{ x: exitX }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                onPanEnd={handlePanEndEvent}
                onAnimationComplete={() => {
                  x.set(0)
                  setIsSwiped(false)
                }}
              >
                <MantineCard
                  withBorder
                  className={classes.card}
                  onClick={() => {
                    setReversedCard(true)
                  }}
                >
                  <MantineCard.Section>
                    {image && <Image src={image} alt={header} height={200} />}
                  </MantineCard.Section>
                  <MantineCard.Section className={classes.section}>
                    <Group justify="space-between">
                      <Text fz="lg" fw={500}>
                        {header}
                      </Text>
                    </Group>

                    <Text fz="sm" mt="xs">
                      {desc}
                    </Text>
                  </MantineCard.Section>{" "}
                  <Flex justify="space-between" align="center" mt="sm">
                    <Text fz="sm">1/10</Text>
                    <Badge size="sm" variant="light" color="var(--main-color)">
                      {catalouge}
                    </Badge>
                    {favCard}
                  </Flex>
                </MantineCard>
              </motion.div>
              <motion.div
                className={classes.icon}
                style={{
                  x,
                  background: backgroundColor,
                  border: border,
                  display: iconDisplay,
                  borderRadius: "var(--mantine-radius-lg)",
                }}
              >
                <svg className={classes.progressIcon} viewBox="0 0 50 50">
                  <motion.path
                    fill="none"
                    strokeWidth="1"
                    stroke={color}
                    d="M 0, 20 a 20, 20 0 1,0 40,0 a 20, 20 0 1,0 -40,0"
                    style={{ translateX: 5, translateY: 5 }}
                  />
                  <motion.path
                    fill="none"
                    strokeWidth="1"
                    stroke={color}
                    d="M14,26 L 22,33 L 35,16"
                    strokeDasharray="0 1"
                    style={{ pathLength: tickPath }}
                  />
                  <motion.path
                    fill="none"
                    strokeWidth="1"
                    stroke={color}
                    d="M17,17 L33,33"
                    strokeDasharray="0 1"
                    style={{ pathLength: crossPathA }}
                  />
                  <motion.path
                    fill="none"
                    strokeWidth="1"
                    stroke={color}
                    d="M33,17 L17,33"
                    strokeDasharray="0 1"
                    style={{ pathLength: crossPathB }}
                  />
                </svg>
              </motion.div>
            </motion.div>
          </Flex>
        ) : (
          <Flex justify="center" className={classes.cardContainerReverse}>
            <MantineCard withBorder className={classes.card} onClick={() => setReversedCard(false)}>
              <MantineCard.Section className={classes.section}>
                <Group justify="space-between">
                  <Text fz="lg" fw={500}>
                    {header}
                  </Text>
                </Group>

                <Text fz="sm" mt="xs">
                  {desc}
                </Text>
              </MantineCard.Section>
              <Flex justify="space-between" align="center" mt="sm">
                <Text fz="sm">1/10</Text>
                <Badge variant="dark" size="sm">
                  {catalouge}
                </Badge>
                {favCard}
              </Flex>
            </MantineCard>
          </Flex>
        )}
      </main>
    </Layout>
  )
}

export default Card
