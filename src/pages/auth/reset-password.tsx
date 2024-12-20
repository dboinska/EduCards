import Layout from "@/layouts/Root.layout"
import { BlitzPage } from "@blitzjs/next"

import { ResetPasswordView } from "@/modules/auth/views/reset-password.view"

const ResetPasswordPage: BlitzPage = () => <ResetPasswordView />

ResetPasswordPage.redirectAuthenticatedTo = "/"
ResetPasswordPage.getLayout = (page) => <Layout title="Reset Your Password">{page}</Layout>

export default ResetPasswordPage
