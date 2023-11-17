import { ErrorFallbackProps, ErrorComponent, ErrorBoundary, AppProps } from "@blitzjs/next"
import { AuthenticationError, AuthorizationError } from "blitz"
import { withBlitz } from "src/blitz-client"
import "src/styles/globals.css"

// core styles are required for all packages
import "@mantine/core/styles.css"

import { MantineProvider, createTheme } from "@mantine/core"

const theme = createTheme({
  /** Put your mantine theme override here */
})

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
    <ErrorBoundary FallbackComponent={RootErrorFallback}>
      <MantineProvider theme={theme}>{getLayout(<Component {...pageProps} />)}</MantineProvider>
    </ErrorBoundary>
  )
}

export default withBlitz(MyApp)
