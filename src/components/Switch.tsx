import { SegmentedControl, SegmentedControlItem } from "@mantine/core"
import styles from "src/styles/Catalogs.module.css"
import classes from "src/styles/Switch.module.css"
import { useCurrentUser } from "@/users/hooks/useCurrentUser"

type Data = string[] | SegmentedControlItem[]

export function Switch({
  value,
  setValue,
  data,
}: {
  value: string
  setValue: (value: string) => void
  data: Data
}) {
  const currentUser = useCurrentUser()
  return (
    <div className={styles.filters}>
      <SegmentedControl
        value={value}
        onChange={setValue}
        radius="xl"
        size="sm"
        data={currentUser?.id ? data : ["Public"]}
        classNames={classes}
      />
    </div>
  )
}
