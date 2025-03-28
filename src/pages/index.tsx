import { Container, Title, Text, Button } from "@mantine/core"
import classes from "../styles/Home.module.css"
import type { BlitzPage } from "@blitzjs/next"
import { Routes } from "@blitzjs/next"
import Layout from "@/layouts/Root.layout"
import { useSession } from "@blitzjs/auth"
import Link from "next/link"

const Home: BlitzPage = () => {
  const { userId } = useSession({ suspense: false })

  return (
    <Layout title="Home">
      <div className={classes.root}>
        <Container size="lg" h="calc(100% - 56px)">
          <div className={classes.inner}>
            <div className={classes.content}>
              <Title className={classes.title}>
                Discover the{" "}
                <Text
                  component="span"
                  inherit
                  variant="gradient"
                  gradient={{ from: "lime", to: "blue" }}
                >
                  simplicity of learning
                </Text>{" "}
                thanks to an innovative application.
              </Title>

              <Text className={classes.description} mt="30">
                With EduCards, learning becomes faster, more effective, and more engaging. The app
                uses intelligent flashcards to help you achieve your learning goals, whether you
                want to master a new language, prepare for an exam, or expand your knowledge in any
                field.
              </Text>

              {userId && (
                <Button
                  variant="gradient"
                  gradient={{ from: "lime", to: "blue" }}
                  radius="lg"
                  size="lg"
                  className={classes.control}
                  mt={40}
                  component={Link}
                  href={Routes.Catalogs()}
                >
                  Start learning
                </Button>
              )}

              {!userId && (
                <Button
                  variant="gradient"
                  gradient={{ from: "lime", to: "blue" }}
                  radius="lg"
                  size="lg"
                  className={classes.control}
                  mt={40}
                  component={Link}
                  href={Routes.SignupPage()}
                >
                  Sign up
                </Button>
              )}
            </div>
          </div>
        </Container>
      </div>
    </Layout>
  )
}

export default Home
