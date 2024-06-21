import { useState } from "react"
import { UnstyledButton, Menu, Image, Flex } from "@mantine/core"
import { IconChevronDown } from "@tabler/icons-react"
import classes from "src/styles/Picker.module.css"
import { useRouter } from "next/router"

type PickerProps = {
  value: string
  data: { label: string; image: string; name: string; value: string }[]
  pathname: string
}

export function Picker({ value, data, pathname }: PickerProps) {
  const [opened, setOpened] = useState(false)
  const [selected, setSelected] = useState(data[0])
  const router = useRouter()

  const handlePick = (item: { label: string; image: string; name: string; value: string }) => {
    setSelected(item)
    void router
      .push({
        pathname: pathname,
        query: { ...router.query, type: item.value },
      })
      .catch((error) => {
        console.error("Failed to navigate", error)
      })
  }

  const items = data.map((item) => (
    <Menu.Item
      leftSection={<Image src={item.image} maw={18} width={18} height={18} alt={item.name} />}
      onClick={() => handlePick(item)}
      key={item.label}
    >
      {item.label}
    </Menu.Item>
  ))

  return (
    <Menu
      onOpen={() => setOpened(true)}
      onClose={() => setOpened(false)}
      radius="md"
      width="target"
      withinPortal
    >
      <Menu.Target>
        <UnstyledButton
          className={classes.control}
          data-expanded={opened || undefined}
          mah={"36px"}
          aria-label={selected?.label}
        >
          <Flex gap="xs">
            <Image src={selected?.image} width={22} height={22} alt={selected?.name} />
            <label className={classes.label}>{selected?.label}</label>
          </Flex>
          <IconChevronDown size="1rem" className={classes.icon} />
        </UnstyledButton>
      </Menu.Target>
      <Menu.Dropdown>{items}</Menu.Dropdown>
    </Menu>
  )
}
