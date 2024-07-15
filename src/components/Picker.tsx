import { useState, useEffect } from "react"
import { UnstyledButton, Menu, Image, Flex } from "@mantine/core"
import { IconChevronDown } from "@tabler/icons-react"
import classes from "src/styles/Picker.module.css"

export interface PickerOption {
  label: string
  imageAlt?: string
  value: string
  image?: string
}

type PickerProps = {
  options: PickerOption[]
  onChange?: (value: PickerOption) => void
  defaultValue?: string
  id: string
}

export function Picker({ defaultValue, options, onChange, id }: PickerProps) {
  const [opened, setOpened] = useState(false)
  const [selected, setSelected] = useState<PickerOption | undefined>(options[0])

  useEffect(() => {
    if (defaultValue && options.length) {
      const option = options.find((opt) => opt.value === defaultValue)
      setSelected(option)
    }
  }, [defaultValue, options])

  const handleSelectionChange = (option: PickerOption) => {
    setSelected(option)
    onChange?.(option)
  }

  return (
    <Menu
      onOpen={() => setOpened(true)}
      onClose={() => setOpened(false)}
      radius="md"
      width="target"
      withinPortal
      id={id}
    >
      <Menu.Target>
        <UnstyledButton
          className={classes.control}
          data-expanded={opened || undefined}
          mah={"36px"}
          aria-label={selected?.label}
        >
          <Flex gap="xs">
            <Image src={selected?.image} width={22} height={22} alt={selected?.imageAlt} />
            <label className={classes.label}>{selected?.label}</label>
          </Flex>
          <IconChevronDown size="1rem" className={classes.icon} />
        </UnstyledButton>
      </Menu.Target>
      <Menu.Dropdown>
        {options.map((item) => (
          <Menu.Item
            leftSection={
              <Image src={item.image} maw={18} width={18} height={18} alt={item.imageAlt} />
            }
            onClick={() => handleSelectionChange(item)}
            key={item.label}
          >
            {item.label}
          </Menu.Item>
        ))}
      </Menu.Dropdown>
    </Menu>
  )
}
