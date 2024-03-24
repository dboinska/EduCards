import Layout from "src/core/layouts/Layout"
import { BlitzPage } from "@blitzjs/next"

import classes from "../styles/Chat.module.css"
import { Avatar, Group, Paper, Text, TypographyStylesProvider } from "@mantine/core"

const Chat: BlitzPage = () => {
  return (
    <Layout title="Chat">
      <main>
        <Paper withBorder radius="lg" className={classes.comment}>
          <Group className={classes.author}>
            <Avatar
              src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png"
              alt="Jacob Warnhalter"
              radius="xl"
            />
            <div>
              <Text fz="sm">Jacob Warnhalter</Text>
              <Text fz="xs">10 minutes ago</Text>
            </div>
          </Group>
          <TypographyStylesProvider className={classes.body}>
            <div
              className={classes.content}
              dangerouslySetInnerHTML={{
                __html:
                  '<p>I use <a href="https://heroku.com/" rel="noopener noreferrer" target="_blank">Heroku</a> to host my Node.js application, but MongoDB add-on appears to be too <strong>expensive</strong>. I consider switching to <a href="https://www.digitalocean.com/" rel="noopener noreferrer" target="_blank">Digital Ocean</a> VPS to save some cash.</p>',
              }}
            />
          </TypographyStylesProvider>
        </Paper>
        <Paper withBorder radius="lg" className={classes.comment__right}>
          <Group className={classes.author}>
            <Avatar
              src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png"
              alt="Jacob Warnhalter"
              radius="xl"
            />
            <div>
              <Text fz="sm">Jacob Warnhalter</Text>
              <Text fz="xs" c="dimmed">
                10 minutes ago
              </Text>
            </div>
          </Group>
          <TypographyStylesProvider className={classes.body}>
            <div
              className={classes.content}
              dangerouslySetInnerHTML={{
                __html:
                  '<p>I use <a href="https://heroku.com/" rel="noopener noreferrer" target="_blank">Heroku</a> to host my Node.js application, but MongoDB add-on appears to be too <strong>expensive</strong>. I consider switching to <a href="https://www.digitalocean.com/" rel="noopener noreferrer" target="_blank">Digital Ocean</a> VPS to save some cash.</p>',
              }}
            />
          </TypographyStylesProvider>
        </Paper>
        <Paper withBorder radius="lg" className={classes.comment}>
          <Group className={classes.author}>
            <Avatar
              src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png"
              alt="Jacob Warnhalter"
              radius="xl"
            />
            <div>
              <Text fz="sm">Jacob Warnhalter</Text>
              <Text fz="xs">10 minutes ago</Text>
            </div>
          </Group>
          <TypographyStylesProvider className={classes.body}>
            <div
              className={classes.content}
              dangerouslySetInnerHTML={{
                __html:
                  '<p>I use <a href="https://heroku.com/" rel="noopener noreferrer" target="_blank">Heroku</a> </p>',
              }}
            />
          </TypographyStylesProvider>
        </Paper>
        <Paper withBorder radius="lg" className={classes.comment__right}>
          <Group className={classes.author}>
            <Avatar
              src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png"
              alt="Jacob Warnhalter"
              radius="xl"
            />
            <div>
              <Text fz="sm">Jacob Warnhalter</Text>
              <Text fz="xs" c="dimmed">
                10 minutes ago
              </Text>
            </div>
          </Group>
          <TypographyStylesProvider className={classes.body}>
            <div
              className={classes.content}
              dangerouslySetInnerHTML={{
                __html:
                  '<p>I use <a href="https://heroku.com/" rel="noopener noreferrer" target="_blank">Heroku</a> to host my Node.js application, but MongoDB add-on appears to be too <strong>expensive</strong>. I consider switching to <a href="https://www.digitalocean.com/" rel="noopener noreferrer" target="_blank">Digital Ocean</a> VPS to save some cash.</p>',
              }}
            />
          </TypographyStylesProvider>
        </Paper>
      </main>
    </Layout>
  )
}

export default Chat
