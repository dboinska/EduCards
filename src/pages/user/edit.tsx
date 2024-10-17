import { Button, Flex, Tabs, TextInput, Notification, Modal, Checkbox } from "@mantine/core"
import { FORM_ERROR } from "@/core/components/Form"
import { EditProfileSchema } from "@/auth/schemas"

import { ImageUpload } from "@/components/ImageUpload"
import { useMutation } from "@blitzjs/rpc"

import { useForm } from "@mantine/form"
import { zodResolver } from "mantine-form-zod-resolver"
import { BlitzPage, Routes } from "@blitzjs/next"
import { useRouter } from "next/router"
import { notifications } from "@mantine/notifications"

import classes from "src/styles/Notifications.module.css"
import Layout from "@/core/layouts/Layout"

import styles from "src/styles/Catalogs.module.css"
import { useState } from "react"
import { useDisclosure } from "@mantine/hooks"
import { gSSP } from "@/blitz-server"
import getUser from "@/users/queries/getUser"
import { InferGetServerSidePropsType } from "next"
import editProfile from "@/auth/mutations/editProfile"
import deleteProfile from "@/auth/mutations/deleteProfile"

export const EditProfile: BlitzPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({
  user,
  query,
}) => {
  const router = useRouter()

  const [editProfileMutation, { isLoading }] = useMutation(editProfile)

  const [activeTab, setActiveTab] = useState<string | null>("basicInfo")
  const [enteredUsername, setEnteredUsername] = useState<string>("")

  const [opened, { open, close }] = useDisclosure(false)

  const initialValues = {
    username: user?.name,
    email: user?.email,
    isPublic: user?.isPublic,
    avatar: user?.imageUrl,
    cover: user?.cover,
    currentPassword: "",
    newPassword: "",
    newPasswordConfirmation: "",
  }

  console.log({ initialValues })

  const [deleteProfileMutation] = useMutation(deleteProfile)

  const form = useForm({
    mode: "uncontrolled",
    validate: zodResolver(EditProfileSchema),
    initialValues,
    validateInputOnChange: true,
    validateInputOnBlur: true,
  })

  const [isPublic, setIsPublic] = useState<boolean>((form.values?.isPublic as boolean) || false)

  const handleOnDrop = async (files: any, index: number, path: string, field: string) => {
    const formData = new FormData()
    formData.append("file", files[0])

    try {
      const response = await fetch(path, {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Failed to upload cover")
      }

      const result = await response.json()

      form.setFieldValue(field, result.fileURL)
      console.log("File uploaded successfully", result)
    } catch (error) {
      console.error("Error uploading cover", error)
    }
  }

  const handleOnReject = (files: any, field: string) => {
    console.log(files[0].errors[0].message)
    form.setFieldError(field, files[0].errors[0].message)
  }

  const handleOnRemove = async (field: string) => {
    form.setFieldValue(field, "")
  }

  const handleSubmit = async (values) => {
    console.log({ values })
    try {
      await editProfileMutation(values, {
        onSuccess: async () => {
          await router.push(Routes.UserPage({ id: user.userId }))
        },
      })
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
        notifications.show({
          title: "Update failed",
          message: error.message || "There was an issue updating your profile",
          color: "red",
          autoClose: 5000,
        })
      }
    }
  }

  const handleDeleteAccount = async () => {
    try {
      if (enteredUsername === user.name) {
        await deleteProfileMutation()
        notifications.show({
          title: "Account deleted successfully",
          message: "You will be redirected to the homepage.",
          color: "green",
          position: "top-right",
          classNames: classes,
          autoClose: 5000,
        })
        await router.push(Routes.Home())
      } else {
        notifications.show({
          title: "Incorrect username",
          message: "Please try again.",
          color: "red",
          position: "top-right",
          classNames: classes,
          autoClose: 5000,
        })
      }
    } catch (error: any) {
      notifications.show({
        title: "Failed to delete account",
        message: `Try again`,
        color: "red",
        position: "top-right",
        classNames: classes,
        autoClose: 5000,
      })
      console.error("Failed to delete account:", error)
    }
  }

  console.log({ isLoading })
  console.log("Form errors:", form.errors)

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
                    overflowX: "auto",
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
                  <Checkbox
                    label="Set profile as public to receive shared resources"
                    checked={isPublic as boolean}
                    onChange={(event) => {
                      console.log(
                        { formIsPublic: form.values.isPublic as boolean },
                        event.currentTarget.checked
                      )
                      setIsPublic(event.currentTarget.checked)
                      form.setFieldValue("isPublic", event.currentTarget.checked)
                    }}
                    color="lime.4"
                    maw="380px"
                    my="md"
                    radius="50%"
                  />
                </Tabs.Panel>

                <Tabs.Panel value="imagesSettings" my="md">
                  <Flex direction="column" gap="sm" m="0 auto">
                    <ImageUpload
                      label="Avatar:"
                      placeholder="Select your avatar"
                      existingImageUrl={form.values.avatar}
                      onDrop={(files) =>
                        handleOnDrop(files, 0, "/api/catalog/upload-cover", "imageUrl")
                      }
                      onReject={(files) => handleOnReject(files, "imageUrl")}
                      onRemove={() => handleOnRemove("imageUrl")}
                      {...form.getInputProps("avatar")}
                    />
                    <ImageUpload
                      label="Cover:"
                      placeholder="Select your cover"
                      existingImageUrl={form.values.cover}
                      onDrop={(files) =>
                        handleOnDrop(files, 0, "/api/catalog/upload-cover", "cover")
                      }
                      onReject={(files) => handleOnReject(files, "cover")}
                      onRemove={() => handleOnRemove("cover")}
                      {...form.getInputProps("cover")}
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
                      {...form.getInputProps("currentPassword")}
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
                            value={enteredUsername}
                            onChange={(e) => setEnteredUsername(e.currentTarget.value)}
                          />
                          <Button variant="filled" color="red" onClick={handleDeleteAccount}>
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
                  <Button type="submit" disabled={isLoading} radius="md" my="md" miw="300px">
                    {isLoading ? "Updating..." : "Update Profile"}
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

export const getServerSideProps = gSSP(async ({ query, ctx }) => {
  if (!ctx.session.userId) {
    return {
      redirect: {
        destination: Routes.Home(),
        permanent: false,
      },
    }
  }
  const user = await getUser(ctx)

  return { props: { user, query } }
})

export default EditProfile
