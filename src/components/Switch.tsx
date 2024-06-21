import { SegmentedControl, SegmentedControlItem } from "@mantine/core"
import styles from "src/styles/Catalogs.module.css"
import classes from "src/styles/Switch.module.css"
import { useCurrentUser } from "@/users/hooks/useCurrentUser"
import { useRouter } from "next/router"

type SwitchProps = {
  value: string
  setValue: (value: string) => void
  data: { label: string; value: string }[]
  pathname: string
}

export function Switch({ value, setValue, data, pathname }: SwitchProps) {
  const currentUser = useCurrentUser()
  const router = useRouter()

  const filteredData = currentUser ? data : data.filter((item) => item.value === "/public")

  console.log({ filteredData })

  const handleChange = async (item: { label: string; value: string }) => {
    setValue(item.value)
    try {
      await router.push({
        pathname: pathname,
        query: { ...router.query, type: item.value },
      })
    } catch (error) {
      console.error("Failed to navigate", error)
    }
  }

  return (
    <div className={styles.filters}>
      <SegmentedControl
        value={value}
        onChange={async (value) => {
          const selectedItem = filteredData.find((item) => item.value === value)
          if (selectedItem) {
            await handleChange(selectedItem)
          }
        }}
        radius="xl"
        size="sm"
        data={filteredData}
        classNames={classes}
      />
    </div>
  )
}
