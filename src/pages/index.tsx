import { Container, Title, Text, Button } from "@mantine/core"
import classes from "../styles/Home.module.css"
import { BlitzPage } from "@blitzjs/next"
import Layout from "src/core/layouts/Layout"

const Home: BlitzPage = () => {
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

              <Button
                variant="gradient"
                gradient={{ from: "lime", to: "blue" }}
                radius="lg"
                size="lg"
                className={classes.control}
                mt={40}
              >
                Sign up
              </Button>
            </div>
          </div>
        </Container>
      </div>
    </Layout>
  )
}

export default Home
