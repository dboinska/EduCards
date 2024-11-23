import { Routes } from "@blitzjs/next"
import { Menu, Button, rem } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { notifications } from "@mantine/notifications"
import { IconCirclePlus, IconSettings, IconTrash } from "@tabler/icons-react"
import Link from "next/link"
import { useRouter } from "next/router"
import styles from "src/styles/Catalogs.module.css"

import classes from "src/styles/Notifications.module.css"
import { ConfirmationDialog } from "./ConfirmationDialog"

export function ToggleMenu({ item, settings, sm }) {
  const deleteSetting = settings.find((setting) => setting.id === "delete")
  const editSetting = settings.find((setting) => setting.id === "edit")
  const newStudyPlanSetting = settings.find((setting) => setting.id === "newStudyPlan")
  const [opened, { open, close }] = useDisclosure(false)

  const { push } = useRouter()

  async function redirectToCatalogs() {
    await push(Routes.Catalogs({ revalidatePath: true }))
  }

  async function redirectToPlans() {
    await push(Routes.StudyPlans({ revalidatePath: true }))
  }

  const handleDelete = async () => {
    try {
      if (deleteSetting?.action) {
        deleteSetting.action()

        notifications.show({
          title: `${item} Deleted`,
          message: `${item} has been successfully deleted.`,
          position: "top-right",
          color: "green",
          classNames: classes,
          autoClose: 5000,
        })

        if (item === "catalog") {
          await redirectToCatalogs()
        }
        if (item === "study plan") {
          await redirectToPlans()
        }
      }
    } catch (e) {
      console.error(e)
      notifications.show({
        title: "Failed to Delete",
        message: `${item} hasn't been successfully deleted.`,
        position: "top-right",
        color: "red",
        classNames: classes,
        autoClose: 5000,
      })
    }
  }

  const handleEdit = () => {
    try {
      if (editSetting?.action) {
        editSetting.action()
      }
    } catch (e) {
      console.error(e)
      notifications.show({
        title: "Failed to Edit",
        message: `${item} hasn't been successfully deleted.`,
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
        <Button
          p={sm ? "0 " : "0 2px"}
          w={sm ? "24" : "36"}
          h={sm ? "24" : "36"}
          radius="xl"
          className={styles.iconSettings}
          variant="transparent"
          color="var(--mantine-color-gray-8)"
        >
          <IconSettings />
        </Button>
      </Menu.Target>

      <Menu.Dropdown
        style={{ boxShadow: "0px 3px 3px rgba(0,0,0,0.2), 0px 0px 1px rgba(0,0,0,0.1)" }}
      >
        {newStudyPlanSetting && (
          <Link href={newStudyPlanSetting.path}>
            <Menu.Item leftSection={<IconCirclePlus style={{ width: rem(14), height: rem(14) }} />}>
              New study plan
            </Menu.Item>
          </Link>
        )}

        {settings.find((setting) => setting.id === "edit")?.path ? (
          <Link href={settings.find((setting) => setting.id === "edit")?.path}>
            <Menu.Item leftSection={<IconSettings style={{ width: rem(14), height: rem(14) }} />}>
              Edit {item}
            </Menu.Item>
          </Link>
        ) : (
          <Menu.Item
            leftSection={<IconSettings style={{ width: rem(14), height: rem(14) }} />}
            onClick={handleEdit}
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
      <ConfirmationDialog
        opened={opened}
        close={close}
        item={item}
        onDelete={handleDelete}
        confirmationMessage={`Do you want to remove ${item}?`}
        confirmButtonText={"Delete"}
      />
    </Menu>
  )
}
