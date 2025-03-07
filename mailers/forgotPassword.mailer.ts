import { ResetPasswordEmail } from "@/emails/ResetPassword.email"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

type ResetPasswordMailer = {
  to: string
  username: string
  token: string
}

export function forgotPasswordMailer({ to, username, token }: ResetPasswordMailer) {
  // In production, set APP_ORIGIN to your production server origin
  const origin = process.env.APP_ORIGIN || process.env.BLITZ_DEV_SERVER_ORIGIN
  const resetUrl = `${origin}/auth/reset-password?token=${token}`

  return {
    async send() {
      const { data, error } = await resend.emails.send({
        from: "Educards <noreply@educards.pl>",
        to: [to],
        subject: "Your password reset instructions",
        react: ResetPasswordEmail({ username, resetPasswordLink: resetUrl }),
      })

      if (error) {
        throw new Error(`Error sending email: ${error.message}`)
      }

      if (!data) {
        throw new Error("No data received from Resend")
      }

      return
    },
  }
}
