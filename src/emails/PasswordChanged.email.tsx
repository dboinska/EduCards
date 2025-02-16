import {
  Body,
  Container,
  Head,
  Html,
  Heading,
  Preview,
  Section,
  Text,
  Link,
} from "@react-email/components"

interface PasswordChangedEmailProps {
  username: string
  updatedDate: number | Date
}

const baseUrl = `https://educards.pl`
const resetPasswordLink = `${baseUrl}/auth/forgot-password`

export const PasswordChangedEmail = ({ username, updatedDate }: PasswordChangedEmailProps) => {
  const formattedDate = new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "medium",
  }).format(updatedDate)

  return (
    <Html>
      <Head />
      <Preview>You updated the password for your Educards account</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={heading}>Educards</Heading>
          <Section>
            <Text style={text}>Hi {username},</Text>
            <Text style={text}>
              You updated the password for your Educards account on {formattedDate}. If this was
              you, then no further action is required.
            </Text>
            <Text style={text}>
              However if you did NOT perform this password change, please{" "}
              <Link href={resetPasswordLink} style={link}>
                reset your account password
              </Link>{" "}
              immediately.
            </Text>

            <Text style={text}>
              Remember to use a password that is both strong and unique to your Educards account.
            </Text>

            <Text style={text}>
              Thanks,
              <br />
              Educards Team
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

PasswordChangedEmail.PreviewProps = {
  username: "Dorota",
  updatedDate: new Date(),
} as PasswordChangedEmailProps

export default PasswordChangedEmail

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

const heading = {
  fontSize: "20px",
  color: "#404040",
  fontFamily:
    "'Open Sans', 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif",
  fontWeight: "300",
  margin: 0,
}

const link = {
  textDecoration: "underline",
}
