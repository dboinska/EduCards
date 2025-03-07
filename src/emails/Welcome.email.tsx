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
import * as React from "react"

interface WelcomeEmailProps {
  username: string
}

export const WelcomeEmail = ({ username }: WelcomeEmailProps) => (
  <Html>
    <Head />
    <Preview>
      Welcome to Educards the learning platform that helps you learn and remember anything.
    </Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={heading}>Educards</Heading>
        <Text style={text}>Hi {username},</Text>
        <Text style={text}>
          Welcome to Educards the learning platform that helps you learn and remember anything.
        </Text>
        <Section style={btnContainer}>
          <Button style={button} href="https://educards.pl">
            Get started
          </Button>
        </Section>
        <Text style={text}>
          Best,
          <br />
          The Educards team
        </Text>
      </Container>
    </Body>
  </Html>
)

WelcomeEmail.PreviewProps = {
  username: "Dorota",
} as WelcomeEmailProps

export default WelcomeEmail

const main = {
  backgroundColor: "#f6f9fc",
  padding: "10px 0",
  fontFamily:
    "'Open Sans', 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif",
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

const btnContainer = {
  textAlign: "center" as const,
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
