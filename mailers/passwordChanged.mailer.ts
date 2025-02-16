import { PasswordChangedEmail } from "@/emails/PasswordChanged.email"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

type PasswordChangedMailer = {
  to: string
  username: string
  updatedDate: number | Date
}

export function passwordChangedMailer({ to, username, updatedDate }: PasswordChangedMailer) {
  return {
    async send() {
      const { data, error } = await resend.emails.send({
        //from: "Educards <noreply@educards.pl>",
        from: "Educards <onboarding@resend.dev>",
        to: [to],
        subject: "Your password reset instructions",
        react: PasswordChangedEmail({ username, updatedDate }),
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
