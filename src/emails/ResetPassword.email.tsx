import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Heading,
  Preview,
  Section,
  Text,
} from "@react-email/components"

interface ResetPasswordEmailProps {
  username?: string
  resetPasswordLink?: string
}

const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : ""

export const ResetPasswordEmail = ({ username, resetPasswordLink }: ResetPasswordEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Educards reset your password</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={heading}>Educards</Heading>
          <Section>
            <Text style={text}>Hi {username},</Text>
            <Text style={text}>
              Someone recently requested a password change for your Educards account. If this was
              you, you can set a new password here:
            </Text>
            <Button style={button} href={resetPasswordLink}>
              Reset password
            </Button>
            <Text style={text}>
              If you don&apos;t want to change your password or didn&apos;t request this, just
              ignore and delete this message.
            </Text>
            <Text style={text}>
              Regards,
              <br />
              Educards Team
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

ResetPasswordEmail.PreviewProps = {
  username: "Dorota",
  resetPasswordLink: "https://educards.pl",
} as ResetPasswordEmailProps

export default ResetPasswordEmail

const main = {
  backgroundColor: "#f6f9fc",
  padding: "10px 0",
}

const container = {
  backgroundColor: "#ffffff",
  border: "1px solid #f0f0f0",
  padding: "45px",
}

const text = {
  fontSize: "16px",
  fontFamily:
    "'Open Sans', 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif",
  fontWeight: "300",
  color: "#404040",
  lineHeight: "26px",
}

const button = {
  backgroundColor: "#007ee6",
  borderRadius: "4px",
  color: "#fff",
  fontFamily: "'Open Sans', 'Helvetica Neue', Arial",
  fontSize: "15px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  width: "210px",
  padding: "14px 7px",
}

const heading = {
  fontSize: "20px",
  color: "#404040",
  fontFamily:
    "'Open Sans', 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif",
  fontWeight: "300",
  margin: 0,
}
