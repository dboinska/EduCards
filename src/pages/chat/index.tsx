import Layout from "src/core/layouts/Layout"
import { BlitzPage } from "@blitzjs/next"

import classes from "../../styles/Chat.module.css"
import {
  Avatar,
  Button,
  Container,
  Flex,
  Paper,
  TypographyStylesProvider,
  Text,
  useMantineTheme,
  Loader,
} from "@mantine/core"
import { Form, FORM_ERROR } from "src/core/components/Form"
import { IconArrowNarrowUp } from "@tabler/icons-react"
import { ChatMessage } from "@/chat/schemas"
import { useMutation } from "@blitzjs/rpc"
import createChatMessage from "@/chat/mutations/createChatMessage"
import LabeledTextArea from "@/core/components/LabeledTextArea"
import { useNavigationLinks } from "@/hooks/useNavigationLinks"

import { useEffect, useRef, useState } from "react"

const Chat: BlitzPage = () => {
  const [createMessageMutation, { isSuccess }] = useMutation(createChatMessage)
  const [messages, setMessages] = useState<{ sender: string; content: string }[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const mainChatWindow = useRef<HTMLDivElement>(null)

  const theme = useMantineTheme()
  const { currentUser } = useNavigationLinks()

  useEffect(() => {
    if (mainChatWindow.current) {
      mainChatWindow.current.scrollTop = mainChatWindow.current.scrollHeight
    }
  }, [messages, loading])

  const handleSubmit = async (values) => {
    try {
      setMessages((prevMessage) => [...prevMessage, { sender: "user", content: values.prompt }])
      setLoading(true)

      const response = await createMessageMutation(values)

      const offTopicKeywords = ["recipe", "cooking", "food", "hobby", "music", "movies", "sports"]

      if (response && response.reply) {
        const botResponse = response.reply.toLowerCase()
        const containsOffTopic = offTopicKeywords.some((keyword) => botResponse.includes(keyword))

        if (containsOffTopic) {
          setMessages((prevMessages) => [
            ...prevMessages,
            { sender: "bot", content: "Let's stick to language learning and educational topics." },
          ])
        } else {
          setMessages((prevMessages) => [
            ...prevMessages,
            { sender: "bot", content: response.reply },
          ])
        }
      }

      return { prompt: "" }
    } catch (error) {
      console.error(error)
      return { [FORM_ERROR]: error.message || "Something went wrong" }
    } finally {
      setLoading(false)
    }
  }

  return (
    <Layout title="Chat">
      <main className={classes.mainChatWindow} ref={mainChatWindow}>
        <Flex
          h={{ base: "calc(100vh - 140px)", md: "calc(100vh - 40px)" }}
          direction="column"
          justify="space-between"
        >
          <Container w="100vw">
            {messages.map((msg, index) => (
              <Paper
                key={index}
                withBorder
                radius="lg"
                className={msg.sender === "bot" ? classes.message__answer : classes.message}
              >
                <Flex gap="md">
                  <Avatar
                    src={
                      msg.sender === "user"
                        ? currentUser?.imageUrl ||
                          "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png"
                        : "https://1000logos.net/wp-content/uploads/2023/02/ChatGPT-Logo.jpg"
                    }
                    alt={msg.sender === "user" ? "You" : "Bot"}
                    radius="xl"
                  />

                  <TypographyStylesProvider className={classes.body}>
                    <div
                      className={classes.content}
                      dangerouslySetInnerHTML={{
                        __html: msg.content,
                      }}
                    />
                  </TypographyStylesProvider>
                </Flex>
              </Paper>
            ))}
            {loading && (
              <Flex justify="center" align="center" mt="md">
                <Loader size="sm" />
                <Text ml="sm">Waiting for the bot&apos;s response...</Text>
              </Flex>
            )}
          </Container>

          <Form
            schema={ChatMessage}
            initialValues={{ prompt: "" }}
            onSubmit={handleSubmit}
            className={classes.chatMessage}
          >
            <Flex w="100%" className={classes.texareaContainer} mx={theme.spacing.sm}>
              <LabeledTextArea
                placeholder="Message"
                label=""
                width="calc(100% - 80px)"
                name="prompt"
              />
              <Button type="submit" radius="20px" w="60px" h="36px" disabled={loading}>
                <IconArrowNarrowUp size={24} />
              </Button>
            </Flex>
          </Form>
        </Flex>
      </main>
    </Layout>
  )
}

export default Chat
