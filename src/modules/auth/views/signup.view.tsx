import Link from "next/link"
import { useRouter } from "next/router"
import { Routes } from "@blitzjs/next"
import { useMutation } from "@blitzjs/rpc"
import { useForm } from "@mantine/form"
import { zodResolver } from "mantine-form-zod-resolver"
import {
  BackgroundImage,
  Box,
  Button,
  Flex,
  TextInput,
  Title,
  useMantineTheme,
} from "@mantine/core"

import Layout from "@/layouts/Root.layout"
import { FORM_ERROR } from "@/core/components/Form"
import { ImageUpload } from "@/components/ImageUpload"

import signup from "../mutations/signup"
import { signupSchema } from "../schemas/SignUp.schema"

export const SignupView = () => {
  const router = useRouter()

  const theme = useMantineTheme()

  const initialValues = {
    username: "",
    email: "",
    avatar: "",
    password: "",
    passwordConfirmation: "",
  }

  const [signupMutation] = useMutation(signup)

  const form = useForm({
    mode: "uncontrolled",
    validate: zodResolver(signupSchema),
    initialValues,
    validateInputOnChange: true,
    validateInputOnBlur: true,
  })

  const handleOnDrop = async (files) => {
    const formData = new FormData()
    formData.append("file", files[0])

    try {
      const response = await fetch("/api/user/upload-avatar", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Failed to upload cover")
      }

      const result = await response.json()
      form.setFieldValue("avatar", result.fileURL)
      console.log("File uploaded successfully", result)
    } catch (error) {
      console.error("Error uploading cover", error)
    }
  }

  const handleOnReject = (files) => {
    console.log(files[0].errors[0].message)
    form.setFieldError("imageUrl", files[0].errors[0].message)
  }

  const handleOnRemove = async () => {
    form.setFieldValue("imageUrl", "")
  }

  const handleSubmit = async (values) => {
    try {
      console.log({ values })
      await signupMutation(values, {
        onSuccess: async () => await router.push(Routes.Home()),
      })
    } catch (error) {
      console.error(error)
      form.setErrors({ [FORM_ERROR]: "Signup failed" })
    }
  }

  return (
    <Layout title="Sign Up">
      <BackgroundImage
        h="calc(100% - 56px)"
        w="100%"
        pos="absolute"
        src="/assets/cores-4552918_1920.jpg"
      ></BackgroundImage>
      <Flex w="100vw" direction={{ base: "column", sm: "row" }}>
        <Box w={{ base: "100vw", sm: "60vw" }} h="100%"></Box>
        <Box w={{ base: "100vw", sm: "40vw" }} h="100%" style={{ position: "relative", zIndex: 1 }}>
          <Flex
            direction="column"
            maw="100%"
            m="0 auto"
            mih="calc(100vh )"
            p="lg"
            justify="center"
            style={{
              backdropFilter: "blur(6px)",
              WebkitBackdropFilter: "blur(6px)",
              zIndex: 2,
              backgroundColor: "rgba(255, 255, 255, 0.7)",
            }}
          >
            <Flex
              direction="column"
              m="0 auto"
              justify="center"
              my="lg"
              py="lg"
              w={{ base: "100%", xl: "380px" }}
            >
              <Title order={1} my="md">
                Sign Up
              </Title>
              <form name="newUser" onSubmit={form.onSubmit(handleSubmit)}>
                <TextInput
                  label="User name"
                  placeholder="User name"
                  style={{ width: "100%" }}
                  size="sm"
                  {...form.getInputProps("username")}
                />
                <TextInput
                  label="Email"
                  placeholder="Email"
                  style={{ width: "100%" }}
                  size="sm"
                  {...form.getInputProps("email")}
                />
                <ImageUpload
                  label="Avatar:"
                  placeholder="Select your avatar"
                  hidePreview
                  onDrop={handleOnDrop}
                  onReject={handleOnReject}
                  onRemove={handleOnRemove}
                />
                <TextInput
                  label="Password"
                  placeholder="Password"
                  type="password"
                  style={{ width: "100%" }}
                  size="sm"
                  {...form.getInputProps("password")}
                />
                <TextInput
                  label="Confirm password"
                  placeholder="Confirm password"
                  type="password"
                  style={{ width: "100%" }}
                  size="sm"
                  {...form.getInputProps("passwordConfirmation")}
                />
                <Button type="submit" w="100%" radius="md" mt="md">
                  Create account
                </Button>
              </form>
              <Flex justify="right" my="lg">
                <Link href={Routes.LoginPage()}>
                  <Title order={6}>Login</Title>
                </Link>
              </Flex>
            </Flex>
          </Flex>
        </Box>
      </Flex>
    </Layout>
  )
}
