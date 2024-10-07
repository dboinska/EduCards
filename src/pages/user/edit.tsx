import {
  Button,
  CheckIcon,
  Flex,
  Radio,
  Tabs,
  TextInput,
  useMantineTheme,
  Notification,
  Modal,
} from "@mantine/core"
import { FORM_ERROR } from "@/core/components/Form"
import { Signup } from "@/auth/schemas"

import { ImageUpload } from "@/components/ImageUpload"
import { useMutation } from "@blitzjs/rpc"
import signup from "@/auth/mutations/signup"

import { useForm } from "@mantine/form"
import { zodResolver } from "mantine-form-zod-resolver"
import { Routes } from "@blitzjs/next"
import { useRouter } from "next/router"
import { notifications } from "@mantine/notifications"

import classes from "src/styles/Notifications.module.css"
import Layout from "@/core/layouts/Layout"

import styles from "src/styles/Catalogs.module.css"
import { useState } from "react"
import { useDisclosure } from "@mantine/hooks"

type SignupFormProps = {
  onSuccess?: () => void
}

export const EditProfile = (props: SignupFormProps) => {
  const router = useRouter()

  const [activeTab, setActiveTab] = useState<string>("basicInfo")

  const [opened, { open, close }] = useDisclosure(false)

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
    validate: zodResolver(Signup),
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
      await signupMutation(values)
      await router.push(Routes.Home())
    } catch (error: any) {
      if (error.code === "P2002" && error.meta?.target?.includes("email")) {
        notifications.show({
          title: "This email is already being used",
          message: `Enter another email address`,
          color: "red",
          position: "top-right",
          classNames: classes,
          autoClose: 5000,
        })
        return { email: "This email is already being used" }
      } else {
        console.error(error)
        form.setErrors({ [FORM_ERROR]: "Signup failed" })
        return { [FORM_ERROR]: error.toString() }
      }
    }
  }

  const handleOpen = () => {
    // setOpened(true)
  }

  const handleClose = () => {
    // setOpened(false)
  }

  const handleDelete = () => {
    // Handle delete logic here
    // setOpened(false)
  }
  return (
    <>
      <Layout title="New quiz">
        <main className={styles.main}>
          <Flex
            direction="column"
            w={{ base: "100%", md: "60%" }}
            m="0 auto"
            align="center"
            className={styles.border}
          >
            <div className={styles.header}>
              <h1>Edit profile</h1>
            </div>
            <form
              name="newUser"
              onSubmit={form.onSubmit(handleSubmit)}
              style={{
                width: "100%",
              }}
            >
              <Tabs value={activeTab} onChange={setActiveTab} mb="md" m="0 auto">
                <div
                  style={{
                    width: "100%",
                    overflowX: "scroll",
                    height: "36px",
                  }}
                >
                  <Tabs.List justify="start" style={{ display: "flex", flexWrap: "nowrap" }}>
                    <Tabs.Tab value="basicInfo">Basic Information</Tabs.Tab>
                    <Tabs.Tab value="imagesSettings">Avatar & Cover</Tabs.Tab>
                    <Tabs.Tab value="passwordSettings">Password Settings</Tabs.Tab>
                    <Tabs.Tab value="deleteAccount">Delete Account</Tabs.Tab>
                  </Tabs.List>
                </div>

                <Tabs.Panel value="basicInfo" my="md">
                  <Flex direction="column" gap="sm" m="0 auto">
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
                  </Flex>
                  <Radio
                    icon={CheckIcon}
                    label="Set profile as public to receive shared resources"
                    name="check"
                    checked={true}
                    style={{ pointerEvents: "none" }}
                    color="lime.4"
                    maw="380px"
                    my="md"
                  />
                </Tabs.Panel>

                <Tabs.Panel value="imagesSettings" my="md">
                  <Flex direction="column" gap="sm" m="0 auto">
                    <ImageUpload
                      label="Avatar:"
                      placeholder="Select your avatar"
                      onDrop={handleOnDrop}
                      onReject={handleOnReject}
                      onRemove={handleOnRemove}
                    />
                    <ImageUpload
                      label="Cover:"
                      placeholder="Select your cover"
                      onDrop={handleOnDrop}
                      onReject={handleOnReject}
                      onRemove={handleOnRemove}
                    />
                  </Flex>
                </Tabs.Panel>

                <Tabs.Panel value="passwordSettings" my="md">
                  <Flex direction="column" gap="sm" m="0 auto">
                    <TextInput
                      label="Password"
                      placeholder="Password"
                      type="password"
                      style={{ width: "100%" }}
                      size="sm"
                      {...form.getInputProps("password")}
                    />
                    <TextInput
                      label="New password"
                      placeholder="New password"
                      type="password"
                      style={{ width: "100%" }}
                      size="sm"
                      {...form.getInputProps("newPassword")}
                    />
                    <TextInput
                      label="Confirm new password"
                      placeholder="Confirm new password"
                      type="password"
                      style={{ width: "100%" }}
                      size="sm"
                      {...form.getInputProps("newPasswordConfirmation")}
                    />
                  </Flex>
                </Tabs.Panel>
                <Tabs.Panel value="deleteAccount" my="md">
                  <Notification
                    withCloseButton={false}
                    color="red"
                    title="Account Deletion"
                    radius="md"
                  >
                    <Flex w="100%" align="center" direction="column" gap="md" py="sm">
                      After clicking the button, your account will be deleted in 30 days if you do
                      not log in during this time.
                      <Button variant="filled" color="red" onClick={open}>
                        Delete Account
                      </Button>
                      <Modal opened={opened} onClose={close} title="Delete account" centered>
                        <Flex direction="column" gap="md">
                          <TextInput
                            label="Enter user name to delete account"
                            placeholder="User name"
                            inputWrapperOrder={["label", "error", "input", "description"]}
                          />
                          <Button variant="filled" color="red">
                            Delete Account
                          </Button>
                        </Flex>
                      </Modal>
                    </Flex>
                  </Notification>
                </Tabs.Panel>
              </Tabs>
              <Flex w="100%" justify="center">
                {activeTab !== "deleteAccount" && (
                  <Button type="submit" radius="md" my="md" miw="300px">
                    Update profile
                  </Button>
                )}
              </Flex>
            </form>
          </Flex>
        </main>
      </Layout>
    </>
  )
}

export default EditProfile
