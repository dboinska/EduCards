import { SegmentedControl } from "@mantine/core"
import styles from "src/styles/Switch.module.css"

import type { SegmentedControlProps } from "@mantine/core"

interface SwitchProps extends SegmentedControlProps {
  containerClass?: string
  setValue?: React.Dispatch<React.SetStateAction<string>>
  pathname?: string
}

export const Switch = ({ containerClass, ...props }: SwitchProps) => (
  <div className={containerClass}>
    <SegmentedControl {...props} radius="xl" size="sm" classNames={styles} />
  </div>
)
