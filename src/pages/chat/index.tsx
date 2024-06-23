import Layout from "src/core/layouts/Layout"
import { BlitzPage } from "@blitzjs/next"

import classes from "../../styles/Chat.module.css"
import { Avatar, Button, Flex, Paper, TypographyStylesProvider } from "@mantine/core"
import { Form, FORM_ERROR } from "src/core/components/Form"
import { IconArrowNarrowUp } from "@tabler/icons-react"
import { ChatMessage } from "@/chat/schemas"
import { useMutation } from "@blitzjs/rpc"
import createChatMessage from "@/chat/mutations/createChatMessage"
import LabeledTextArea from "@/core/components/LabeledTextArea"

const Chat: BlitzPage = () => {
  const [createMessageMutation, { isSuccess }] = useMutation(createChatMessage)

  const handleSubmit = async (values) => {
    try {
      await createMessageMutation(values)
      return { prompt: "" }
    } catch (error) {
      console.error(error)
      return { [FORM_ERROR]: error.message || "Something went wrong" }
    }
  }

  return (
    <Layout title="Chat">
      <main className={classes.mainChatWindow}>
        <div>
          <Paper withBorder radius="lg" className={classes.message}>
            <Flex gap="md">
              <Avatar
                src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png"
                alt="Jacob Warnhalter"
                radius="xl"
              />

              <TypographyStylesProvider className={classes.body}>
                <div
                  className={classes.content}
                  dangerouslySetInnerHTML={{
                    __html:
                      '<p>I use <a href="https://heroku.com/" rel="noopener noreferrer" target="_blank">Heroku</a> to host my Node.js application, but MongoDB add-on appears to be too <strong>expensive</strong>. I consider switching to <a href="https://www.digitalocean.com/" rel="noopener noreferrer" target="_blank">Digital Ocean</a> VPS to save some cash.</p>',
                  }}
                />
              </TypographyStylesProvider>
            </Flex>
          </Paper>
          <Paper withBorder radius="lg" className={classes.message__answer}>
            <Flex gap="md">
              <Avatar
                src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png"
                alt="Jacob Warnhalter"
                radius="xl"
              />
              <TypographyStylesProvider className={classes.body}>
                <div
                  className={classes.content}
                  dangerouslySetInnerHTML={{
                    __html:
                      '<p>I use <a href="https://heroku.com/" rel="noopener noreferrer" target="_blank">Heroku</a> to host my Node.js application, but MongoDB add-on appears to be too <strong>expensive</strong>. I consider switching to <a href="https://www.digitalocean.com/" rel="noopener noreferrer" target="_blank">Digital Ocean</a> VPS to save some cash.</p>',
                  }}
                />
              </TypographyStylesProvider>
            </Flex>
          </Paper>
          <Paper withBorder radius="lg" className={classes.message}>
            <Flex gap="md">
              <Avatar
                src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png"
                alt="Jacob Warnhalter"
                radius="xl"
              />
              <TypographyStylesProvider className={classes.body}>
                <div
                  className={classes.content}
                  dangerouslySetInnerHTML={{
                    __html:
                      '<p>I use <a href="https://heroku.com/" rel="noopener noreferrer" target="_blank">Heroku</a> </p>',
                  }}
                />
              </TypographyStylesProvider>
            </Flex>
          </Paper>
          <Paper withBorder radius="lg" className={classes.message}>
            <Flex gap="md">
              <Avatar
                src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png"
                alt="Jacob Warnhalter"
                radius="xl"
              />

              <TypographyStylesProvider className={classes.body}>
                <div
                  className={classes.content}
                  dangerouslySetInnerHTML={{
                    __html:
                      '<p>I use <a href="https://heroku.com/" rel="noopener noreferrer" target="_blank">Heroku</a> </p>',
                  }}
                />
              </TypographyStylesProvider>
            </Flex>
          </Paper>
          <Paper withBorder radius="lg" className={classes.message}>
            <Flex gap="md">
              <Avatar
                src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png"
                alt="Jacob Warnhalter"
                radius="xl"
              />

              <TypographyStylesProvider className={classes.body}>
                <div
                  className={classes.content}
                  dangerouslySetInnerHTML={{
                    __html:
                      '<p>I use <a href="https://heroku.com/" rel="noopener noreferrer" target="_blank">Heroku</a> </p>',
                  }}
                />
              </TypographyStylesProvider>
            </Flex>
          </Paper>
          <Paper withBorder radius="lg" className={classes.message}>
            <Flex gap="md">
              <Avatar
                src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png"
                alt="Jacob Warnhalter"
                radius="xl"
              />

              <TypographyStylesProvider className={classes.body}>
                <div
                  className={classes.content}
                  dangerouslySetInnerHTML={{
                    __html:
                      '<p>I use <a href="https://heroku.com/" rel="noopener noreferrer" target="_blank">Heroku</a> </p>',
                  }}
                />
              </TypographyStylesProvider>
            </Flex>
          </Paper>
          <Paper withBorder radius="lg" className={classes.message__answer}>
            <Flex gap="md">
              <Avatar
                src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png"
                alt="Jacob Warnhalter"
                radius="xl"
              />

              <TypographyStylesProvider className={classes.body}>
                <div
                  className={classes.content}
                  dangerouslySetInnerHTML={{
                    __html:
                      '<p>I use <a href="https://heroku.com/" rel="noopener noreferrer" target="_blank">Heroku</a> to host my Node.js application, but MongoDB add-on appears to be too <strong>expensive</strong>. I consider switching to <a href="https://www.digitalocean.com/" rel="noopener noreferrer" target="_blank">Digital Ocean</a> VPS to save some cash.</p>',
                  }}
                />
              </TypographyStylesProvider>
            </Flex>
          </Paper>
        </div>

        <Form
          schema={ChatMessage}
          initialValues={{ prompt: "" }}
          onSubmit={handleSubmit}
          className={classes.chatMessage}
        >
          <Flex w="100%" className={classes.texareaContainer}>
            <LabeledTextArea
              placeholder="Message"
              label=""
              width="calc(100% - 80px)"
              name="prompt"
            />
            <Button type="submit" radius="20px" w="60px" h="33px" className={classes.messageButton}>
              <IconArrowNarrowUp size={64} />
            </Button>
          </Flex>
        </Form>
      </main>
    </Layout>
  )
}

export default Chat
