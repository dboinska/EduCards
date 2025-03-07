import Head from "next/head"
import { Suspense } from "react"
import { BlitzLayout } from "@blitzjs/next"
import { Flex } from "@mantine/core"

import { BottomBar } from "@/components/BottomBar"
import dynamic from "next/dynamic"

const Layout: BlitzLayout<{ title?: string; children?: React.ReactNode }> = ({
  title,
  children,
}) => {
  const HeaderWithDelay = dynamic(() => import("@/components/Header").then((mod) => mod.Header), {
    ssr: false,
    loading: () => <div>Loading header...</div>,
  })

  return (
    <>
      <Head>
        <title key="title">{title || "blitz-app"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Suspense fallback="Loading...">
        <HeaderWithDelay />
      </Suspense>
      <Flex className="childrenContainer">{children}</Flex>

      <Suspense fallback="Loading...">
        <BottomBar />
      </Suspense>
    </>
  )
}

export default Layout
