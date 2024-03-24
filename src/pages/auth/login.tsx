import { BlitzPage } from "@blitzjs/next"
import Layout from "src/core/layouts/Layout"
import { LoginForm } from "src/auth/components/LoginForm"
import { useRouter } from "next/router"
import { Box } from "@mantine/core"

const LoginPage: BlitzPage = () => {
  const router = useRouter()

  return (
    <Box mt="56px">
      <Layout title="Log In">
        <LoginForm
          onSuccess={(_user) => {
            const next = router.query.next ? decodeURIComponent(router.query.next as string) : "/"
            return router.push(next)
          }}
        />
      </Layout>
    </Box>
  )
}

export default LoginPage
