import { AuthenticationError, PromiseReturnType } from "blitz"
import Link from "next/link"
import { LabeledTextField } from "src/core/components/LabeledTextField"
import { Form, FORM_ERROR } from "src/core/components/Form"
import login from "src/auth/mutations/login"
import { Login } from "src/auth/schemas"
import { useMutation } from "@blitzjs/rpc"
import { Routes } from "@blitzjs/next"
import { BackgroundImage, Box, Flex, Text, Title, Button, useMantineTheme } from "@mantine/core"

type LoginFormProps = {
  onSuccess?: (user: PromiseReturnType<typeof login>) => void
}

export const LoginForm = (props: LoginFormProps) => {
  const [loginMutation] = useMutation(login)
  const theme = useMantineTheme()
  return (
    <>
      <BackgroundImage
        h="calc(100% - 56px)"
        w="100%"
        pos="absolute"
        src="/assets/cores-4552918_1920.jpg"
      ></BackgroundImage>
      <Flex w="100vw" h="calc(100% - 56px)" direction={{ base: "column", sm: "row" }}>
        <Box w={{ base: "100vw", sm: "40vw" }} h="100%" style={{ position: "relative", zIndex: 1 }}>
          <Flex
            direction="column"
            maw="100%"
            m="0 auto"
            h="calc(100vh - 56px)"
            p={{ base: "lg" }}
            justify="center"
            style={{
              backdropFilter: "blur(6px)",
              WebkitBackdropFilter: "blur(6px)",
              zIndex: 2,
              backgroundColor: "rgba(255, 255, 255, 0.7)",
            }}
          >
            <Flex direction="column" m="0 auto" w={{ base: "calc(100% - 60px)", xl: "300px" }}>
              <Title order={1} my="xl">
                Login
              </Title>
              <Form
                schema={Login}
                initialValues={{ email: "", password: "" }}
                onSubmit={async (values) => {
                  try {
                    const user = await loginMutation(values)
                    props.onSuccess?.(user)
                  } catch (error: any) {
                    if (error instanceof AuthenticationError) {
                      return { [FORM_ERROR]: "Sorry, those credentials are invalid" }
                    } else {
                      return {
                        [FORM_ERROR]:
                          "Sorry, we had an unexpected error. Please try again. - " +
                          error.toString(),
                      }
                    }
                  }
                }}
              >
                <LabeledTextField name="email" label="Email" placeholder="Email" />
                <LabeledTextField
                  name="password"
                  label="Password"
                  placeholder="Password"
                  type="password"
                />
                <Button type="submit" w="100%" radius="md">
                  Login
                </Button>
                <div>
                  <Link href={Routes.ForgotPasswordPage()}>
                    <Text c={theme.colors.gray[6]}>Forgot your password?</Text>
                  </Link>
                </div>
              </Form>
              <Flex justify="right" my="lg">
                <Link href={Routes.SignupPage()}>
                  <Title order={6}>Sign Up</Title>
                </Link>
              </Flex>
            </Flex>
          </Flex>
        </Box>
      </Flex>
    </>
  )
}

export default LoginForm
