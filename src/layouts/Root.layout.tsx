import Head from "next/head"
import { Suspense } from "react"
import { BlitzLayout } from "@blitzjs/next"
import { Flex } from "@mantine/core"

import { Header } from "@/components/Header"
import { BottomBar } from "@/components/BottomBar"

const Layout: BlitzLayout<{ title?: string; children?: React.ReactNode }> = ({
  title,
  children,
}) => {
  return (
    <>
      <Head>
        <title key="title">{title || "blitz-app"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Suspense fallback="Loading...">
        <Header />
      </Suspense>
      <Flex className="childrenContainer">{children}</Flex>

      <Suspense fallback="Loading...">
        <BottomBar />
      </Suspense>
    </>
  )
}

export default Layout
