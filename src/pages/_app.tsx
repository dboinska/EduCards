import { Suspense } from "react"
import { ErrorFallbackProps, ErrorComponent, ErrorBoundary, AppProps } from "@blitzjs/next"
import { AuthenticationError, AuthorizationError } from "blitz"
import { withBlitz } from "src/blitz-client"
import "src/styles/globals.css"

import "@mantine/core/styles.css"
import "@mantine/notifications/styles.css"

import { MantineProvider, createTheme } from "@mantine/core"
import { Notifications } from "@mantine/notifications"

import { DrawerProvider } from "@/core/providers/drawerProvider"

import Head from "next/head"

const theme = createTheme({})

function RootErrorFallback({ error }: ErrorFallbackProps) {
  if (error instanceof AuthenticationError) {
    return <div>Error: You are not authenticated</div>
  } else if (error instanceof AuthorizationError) {
    return (
      <ErrorComponent
        statusCode={error.statusCode}
        title="Sorry, you are not authorized to access this"
      />
    )
  } else {
    return (
      <ErrorComponent
        statusCode={(error as any)?.statusCode || 400}
        title={error.message || error.name}
      />
    )
  }
}

function MyApp({ Component, pageProps }: AppProps) {
  const getLayout = Component.getLayout || ((page) => page)
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </Head>
      <ErrorBoundary FallbackComponent={RootErrorFallback}>
        <Suspense fallback="Loading...">
          <DrawerProvider>
            <MantineProvider theme={theme}>
              <Notifications zIndex={9999} />
              {getLayout(<Component {...pageProps} />)}
            </MantineProvider>
          </DrawerProvider>
        </Suspense>
      </ErrorBoundary>
    </>
  )
}

export default withBlitz(MyApp)
