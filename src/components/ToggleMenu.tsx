import { Routes } from "@blitzjs/next"
import { Menu, Button, rem, Dialog, Group, Text } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { notifications } from "@mantine/notifications"
import { IconCirclePlus, IconSettings, IconTrash } from "@tabler/icons-react"
import Link from "next/link"
import { useRouter } from "next/router"
import { useState } from "react"

import classes from "src/styles/Notifications.module.css"

export function ToggleMenu({ item, settings }) {
  const deleteSetting = settings.find((setting) => setting.id === "delete")
  const editSetting = settings.find((setting) => setting.id === "edit")
  const [opened, { open, close }] = useDisclosure(false)
  const [loading, setLoading] = useState(false)

  const { push } = useRouter()

  async function redirectToCatalogs() {
    await push(Routes.Catalogs({ revalidatePath: true }))
  }

  const handleDelete = async () => {
    try {
      setLoading(true)
      if (deleteSetting?.action) {
        deleteSetting.action()

        notifications.show({
          title: "Catalog Deleted",
          message: `Catalog has been successfully deleted.`,
          position: "top-right",
          color: "green",
          classNames: classes,
          autoClose: 5000,
        })

        close()
        await redirectToCatalogs()
      }
    } catch (e) {
      console.error(e)
      notifications.show({
        title: "Failed to Delete",
        message: `Catalog hasn't been successfully deleted.`,
        position: "top-right",
        color: "red",
        classNames: classes,
        autoClose: 5000,
      })
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = () => {
    console.log({})
    try {
      if (editSetting?.action) {
        editSetting.action()
      }
    } catch (e) {
      console.error(e)
      notifications.show({
        title: "Failed to Edit",
        message: `Catalog hasn't been successfully deleted.`,
        position: "top-right",
        color: "red",
        classNames: classes,
        autoClose: 5000,
      })
    }
  }

  return (
    <Menu>
      <Menu.Target>
        <Button color="transparent" p="0 var(--mantine-spacing-xs)">
          <IconSettings size="22" style={{ color: "var(--mantine-color-black)" }} />
        </Button>
      </Menu.Target>

      <Menu.Dropdown>
        <Link href={settings.find((setting) => setting.id === "newStudyPlan")?.path}>
          <Menu.Item leftSection={<IconCirclePlus style={{ width: rem(14), height: rem(14) }} />}>
            New study plan
          </Menu.Item>
        </Link>
        {settings.find((setting) => setting.id === "edit")?.path ? (
          <Link href={settings.find((setting) => setting.id === "edit")?.path}>
            <Menu.Item leftSection={<IconSettings style={{ width: rem(14), height: rem(14) }} />}>
              Edit {item}
            </Menu.Item>
          </Link>
        ) : (
          <Menu.Item
            leftSection={<IconSettings style={{ width: rem(14), height: rem(14) }} />}
            onClick={() => handleEdit}
          >
            Edit {item}
          </Menu.Item>
        )}

        <Menu.Divider />
        <Menu.Item
          color="red"
          leftSection={<IconTrash style={{ width: rem(14), height: rem(14) }} />}
          onClick={() => open()}
        >
          Delete {item}
        </Menu.Item>
      </Menu.Dropdown>
      <Dialog
        opened={opened}
        onClose={close}
        size="md"
        radius="md"
        zIndex="9999"
        styles={{
          root: {
            position: "fixed",
            top: "50%",
            left: "40%",
            transform: "translate(-50%, -50%)",
            zIndex: 1000,
          },
        }}
      >
        <Text size="sm" mb="xs" fw={500}>
          Do you want to remove card: {item}?
        </Text>
        <Group justify="right">
          <Button variant="outline" color="black" onClick={close} disabled={loading}>
            Dismiss
          </Button>
          <Button color="red" onClick={handleDelete} disabled={loading}>
            Delete
          </Button>
        </Group>
      </Dialog>
    </Menu>
  )
}
