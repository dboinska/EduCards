import Head from "next/head"
import React, { Suspense } from "react"
import { BlitzLayout } from "@blitzjs/next"
import { Header } from "src/components/Header"
import { BottomBar } from "@/components/BottomBar"
import { Flex } from "@mantine/core"

const Layout: BlitzLayout<{ title?: string; children?: React.ReactNode }> = ({
  title,
  children,
}) => {
  return (
    <>
      <Head>
        <title>{title || "blitz-app"}</title>
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
