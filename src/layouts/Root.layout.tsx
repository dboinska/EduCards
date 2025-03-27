import Head from "next/head"
import { Suspense } from "react"
import { BlitzLayout } from "@blitzjs/next"
import { Flex } from "@mantine/core"
import dynamic from "next/dynamic"
import { BottomBar } from "@/components/BottomBar"

const HeaderWithDelay = dynamic(() => import("@/components/Header").then((mod) => mod.Header), {
  loading: () => <div>Loading header...</div>,
})

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
        <HeaderWithDelay />
        <Flex className="childrenContainer">{children}</Flex>
        <BottomBar />
      </Suspense>
    </>
  )
}

export default Layout
