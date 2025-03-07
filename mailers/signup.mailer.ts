import { WelcomeEmail } from "@/emails/Welcome.email"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

type SignupMailer = {
  to: string
  username: string
}

export function signupMailer({ to, username }: SignupMailer) {
  return {
    async send() {
      const { data, error } = await resend.emails.send({
        from: "Educards <noreply@educards.pl>",
        to: [to],
        subject: "Welcome to Educards",
        react: WelcomeEmail({ username }),
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
