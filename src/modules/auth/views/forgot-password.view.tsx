import Link from "next/link"
import { Routes } from "@blitzjs/next"
import { useMutation } from "@blitzjs/rpc"
import { Box, BackgroundImage, Flex, Title, Button, Alert } from "@mantine/core"

import { LabeledTextField } from "@/core/components/LabeledTextField"
import { Form, FORM_ERROR } from "@/core/components/Form"

import Layout from "@/layouts/Root.layout"

import forgotPassword from "../mutations/forgotPassword"
import { forgotPasswordSchema } from "../schemas/ForgotPassword.schema"

export const ForgotPasswordView = () => {
  const [forgotPasswordMutation, { isSuccess }] = useMutation(forgotPassword)

  return (
    <Box mt="56px">
      <Layout title="Forgot Password">
        <BackgroundImage
          h="calc(100% - 56px)"
          w="100%"
          pos="absolute"
          src="/assets/cores-4552918_1920.jpg"
        />
        <Flex w="100vw" h="calc(100% - 56px)" direction={{ base: "column", sm: "row" }}>
          <Box
            w={{ base: "100vw", sm: "40vw" }}
            h="100%"
            style={{ position: "relative", zIndex: 1 }}
          >
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
                  Forgot password
                </Title>

                {isSuccess ? (
                  <Alert variant="light" color="blue" title="Request Submitted">
                    If your email is in our system, you will receive instructions to reset your
                    password shortly.
                  </Alert>
                ) : (
                  <Form
                    schema={forgotPasswordSchema}
                    initialValues={{ email: "" }}
                    onSubmit={async (values) => {
                      try {
                        await forgotPasswordMutation(values)
                      } catch (error: any) {
                        return {
                          [FORM_ERROR]: "Sorry, we had an unexpected error. Please try again.",
                        }
                      }
                    }}
                  >
                    <LabeledTextField
                      name="email"
                      label="Email"
                      placeholder="Email"
                      style={{ width: "100%" }}
                    />
                    <Button type="submit" w="100%" radius="md">
                      Send Reset Password Instructions
                    </Button>
                  </Form>
                )}
                <Flex justify="right" my="lg">
                  <Link href={Routes.LoginPage()}>Back to login</Link>
                </Flex>
              </Flex>
            </Flex>
          </Box>
        </Flex>
      </Layout>
    </Box>
  )
}
