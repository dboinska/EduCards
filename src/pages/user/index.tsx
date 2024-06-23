import { BlitzPage, Routes } from "@blitzjs/next"
import { UserCard } from "@/components/UserCard"
import styles from "src/styles/Catalogs.module.css"
import Layout from "@/core/layouts/Layout"
import Link from "next/link"
import { IconHeart, IconHeartFilled, IconSettings } from "@tabler/icons-react"
import { Badge, Flex, Avatar, Box } from "@mantine/core"
import { DynamicBadge } from "@/components/DynamicBadge"

const studyPlansData = [
  {
    color: "var(--mantine-color-yellow-6)",
    header: "English",
    label: "Grammar",
    percent: 30,
  },
  {
    color: "var(--mantine-color-lime-6)",
    header: "Polish",
    label: "Vocabulary",
    percent: 23,
  },
  {
    color: "var(--mantine-color-green-6)",
    header: "French",
    label: "Tenses",
    percent: 12,
  },
  {
    color: "var(--mantine-color-teal-6)",
    header: "Deutch",
    label: "Every week",
    percent: 11,
  },
]

const UserPage: BlitzPage = () => {
  const catalogContent = () => {
    return (
      <>
        <div
          className={`${styles.withOverlay} ${styles.body} ${styles.catalogMinWidth}`}
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80)",
          }}
        >
          <div className={styles.overlay}></div>
          <Link className={styles.cardContent} href={Routes.Catalog()}>
            <div className={styles.headerContainer}>
              <h2>NameNameNameNameNameNameNameName</h2>
            </div>
            <h3>Description</h3>
          </Link>
        </div>
        <div
          className={`${styles.withOverlay} ${styles.body}`}
          style={{
            backgroundImage: "url(https://www.instalki.pl/wp-content/uploads/2021/02/atoms.jpg)",
          }}
        >
          <div className={styles.overlay}></div>
          <Link className={styles.cardContent} href={Routes.Catalog()}>
            <div className={styles.headerContainer}>
              <h2>Lorem ipsum</h2>
            </div>
            <h3>
              In eleifend velit eu neque mollis, rutrum malesuada leo luctus. Curabitur non mauris
              facilisis, fringilla ligula ac. In eleifend velit eu neque mollis, rutrum malesuada
              leo luctus. Curabitur non mauris facilisis, fringilla ligula ac.
            </h3>
          </Link>
          <div className={styles.inline}>
            <div className={styles.author}>
              {" "}
              <Avatar
                src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png"
                alt="Jacob Warnhalter"
                radius="xl"
                size="sm"
              />
              <span>Author</span>
            </div>

            <div className={styles.controls}>
              <Link href={Routes.NewCatalog()}>
                <IconSettings size="22" style={{ color: "var(--mantine-color-gray-3)" }} />
              </Link>
            </div>
          </div>
        </div>
        <div
          className={`${styles.withOverlay} ${styles.body}`}
          style={{
            backgroundImage:
              "url(https://www.podrb.pl/upload/user_content/warzy/winter-3088042-1920-1.jpg)",
          }}
        >
          <div className={styles.overlay}></div>
          <Link className={styles.cardContent} href={Routes.Catalog()}>
            {" "}
            <div className={styles.headerContainer}>
              <h2>Lorem ipsum</h2>
            </div>
            <h3>
              In eleifend velit eu neque mollis, rutrum malesuada leo luctus. Curabitur non mauris
              facilisis, fringilla ligula ac.
            </h3>
          </Link>
          <div className={styles.inline}>
            <Avatar
              src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png"
              alt="Jacob Warnhalter"
              radius="xl"
              size="sm"
            />
            <span>Author</span>
          </div>
        </div>
        <div
          className={`${styles.withOverlay} ${styles.body}`}
          style={{
            backgroundImage:
              "url(https://dc.sklep.pl/wp-content/uploads/2021/07/kropki-25x25cm.jpg)",
          }}
        >
          <div className={styles.overlay}></div>
          <Link className={styles.cardContent} href={Routes.Catalog()}>
            <div className={styles.headerContainer}>
              <h2>Lorem ipsum</h2>
            </div>
            <h3>In eleifend velit eu neque mollis, rutrum malesuada leo luctus.</h3>
          </Link>
          <div className={styles.inline}>
            <Avatar
              src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png"
              alt="Jacob Warnhalter"
              radius="xl"
              size="sm"
            />
            <span>Author</span>
          </div>
        </div>
        <div
          className={`${styles.withOverlay} ${styles.body}`}
          style={{
            backgroundImage: "url(https://planetescape.pl//app/uploads/2020/11/Flamingi.jpg)",
          }}
        >
          <div className={styles.overlay}></div>
          <Link className={styles.cardContent} href={Routes.Catalog()}>
            <div className={styles.headerContainer}>
              <h2>Lorem ipsum</h2>
            </div>
            <h3>In eleifend velit eu neque mollis, rutrum malesuada leo luctus.</h3>
          </Link>
          <div className={styles.inline}>
            <Avatar
              src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png"
              alt="Jacob Warnhalter"
              radius="xl"
              size="sm"
            />
            <span>Author</span>
          </div>
        </div>
        <div className={styles.body}>
          <Link className={styles.cardContent} href={Routes.Catalog()}>
            <div className={styles.headerContainer}>
              <h2>Name</h2>
            </div>
            <h3>Description</h3>
          </Link>
          <div className={styles.inline}>
            <span className={styles.userImg}></span>
            <span>Author</span>
          </div>
        </div>{" "}
        <div className={styles.body}>
          <div className={styles.cardContent}>
            <div className={styles.headerContainer}>
              <h2>Name</h2>
            </div>
            <h3>Description</h3>
          </div>
          <div className={styles.inline}>
            <span className={styles.userImg}></span>
            <span>Author</span>
          </div>
        </div>{" "}
        <div className={styles.body}>
          <div className={styles.cardContent}>
            <div className={styles.headerContainer}>
              <h2>Name</h2>
            </div>
            <h3>Description</h3>
          </div>
          <div className={styles.inline}>
            <span className={styles.userImg}></span>
            <span>Author</span>
          </div>
        </div>{" "}
        <div className={styles.body}>
          <div className={styles.cardContent}>
            <div className={styles.headerContainer}>
              <h2>Name</h2>
            </div>
            <h3>Description</h3>
          </div>
          <div className={styles.inline}>
            <span className={styles.userImg}></span>
            <span>Author</span>
          </div>
        </div>
        <div className={styles.body}>
          <div className={styles.cardContent}>
            <div className={styles.headerContainer}>
              <h2>Name</h2>
            </div>
            <h3>Description</h3>
          </div>
          <div className={styles.inline}>
            <span className={styles.userImg}></span>
            <span>Author</span>
          </div>
        </div>
        <div className={styles.body}>
          <div className={styles.cardContent}>
            <div className={styles.headerContainer}>
              <h2>Name</h2>
            </div>
            <h3>Description</h3>
          </div>
          <div className={styles.inline}>
            <span className={styles.userImg}></span>
            <span>Author</span>
          </div>
        </div>
      </>
    )
  }
  return (
    <>
      <Layout title="Statistics">
        <main className={styles.main}>
          <Flex gap="var(--mantine-spacing-md)" direction="column">
            <UserCard />
            <Box className="border" w="100%" p="var(--mantine-spacing-md)">
              <h3>Active study plans</h3>

              <div className={`${styles.justifyLeft} ${styles.maxWidth600}`}>
                <DynamicBadge data={studyPlansData} />
              </div>
            </Box>
            <Flex className="border" direction="column">
              <div style={{ margin: "var(--mantine-spacing-md)" }}>
                <h2>Last added catalogs</h2>
                <div className={styles.justifyLeft}>{catalogContent()}</div>
              </div>
            </Flex>
            <Flex className="border" direction="column">
              <div style={{ margin: "var(--mantine-spacing-md)" }}>
                <h2>Last added cards</h2>
                <div className={styles.justifyLeft}>{catalogContent()}</div>
              </div>
            </Flex>
          </Flex>
        </main>
      </Layout>
    </>
  )
}

export default UserPage
