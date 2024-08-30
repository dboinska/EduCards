import { Menu, Button, rem } from "@mantine/core"
import { notifications } from "@mantine/notifications"
import { IconCirclePlus, IconSettings, IconTrash } from "@tabler/icons-react"
import Link from "next/link"

import classes from "src/styles/Notifications.module.css"

export function ToggleMenu({ item, settings }) {
  const deleteSetting = settings.find((setting) => setting.id === "delete")
  const editSetting = settings.find((setting) => setting.id === "edit")

  const handleDelete = () => {
    try {
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
          <IconSettings size="22" style={{ color: "var(--mantine-color-gray-3)" }} />
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
          onClick={handleDelete}
        >
          Delete {item}
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  )
}
