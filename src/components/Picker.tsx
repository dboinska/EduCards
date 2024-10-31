import { useState, useEffect } from "react"
import { Select } from "@mantine/core"
import { IconChevronDown } from "@tabler/icons-react"

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
  hideImages?: boolean
  search?: boolean
}

export function Picker({ defaultValue, options, onChange, id, hideImages, search }: PickerProps) {
  const [selected, setSelected] = useState<PickerOption | undefined>(
    options.find((opt) => opt.value === defaultValue) || options[0]
  )

  useEffect(() => {
    if (defaultValue && options.length) {
      const option = options.find((opt) => opt.value === defaultValue)
      setSelected(option)
    }
  }, [defaultValue, options])

  const handleSelectionChange = (value: string) => {
    const selectedOption = options.find((opt) => opt.value === value)
    setSelected(selectedOption)
    if (selectedOption) {
      onChange?.(selectedOption)
    }
  }

  return (
    <Select
      id={id}
      searchable={search}
      placeholder="Choose an option"
      value={selected?.value || ""}
      onChange={handleSelectionChange}
      data={options.map((option) => ({
        value: option.value,
        label: option.label,
        image: option?.image,
        imageAlt: option?.imageAlt,
      }))}
      rightSection={<IconChevronDown size="1rem" />}
      miw="200px"
    />
  )
}
