import { useRouter } from "next/router"
import { Box } from "@mantine/core"

import Layout from "@/layouts/Root.layout"

import { LoginForm } from "../components/LoginForm"

export const LoginView = () => {
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
