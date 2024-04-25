import { Menu, Button, rem } from "@mantine/core"
import { IconCirclePlus, IconSettings, IconTrash } from "@tabler/icons-react"
import Link from "next/link"

export function ToggleMenu({ item, settings }) {
  return (
    <Menu>
      <Menu.Target>
        <Button color="transparent">
          <IconSettings size="22" style={{ color: "var(--mantine-color-gray-3)" }} />
        </Button>
      </Menu.Target>

      <Menu.Dropdown>
        <Link href={settings.find((setting) => setting.id === "newStudyPlan")?.path}>
          <Menu.Item leftSection={<IconCirclePlus style={{ width: rem(14), height: rem(14) }} />}>
            New study plan
          </Menu.Item>
        </Link>
        <Link href={settings.find((setting) => setting.id === "edit")?.path}>
          <Menu.Item leftSection={<IconSettings style={{ width: rem(14), height: rem(14) }} />}>
            Edit {item}
          </Menu.Item>
        </Link>
        <Menu.Divider />
        <Link href={settings.find((setting) => setting.id === "delete")?.path}>
          <Menu.Item
            color="red"
            leftSection={<IconTrash style={{ width: rem(14), height: rem(14) }} />}
          >
            Delete {item}
          </Menu.Item>
        </Link>
      </Menu.Dropdown>
    </Menu>
  )
}
