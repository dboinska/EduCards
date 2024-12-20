import Icon from "@mdi/react"

type SegmentedControlOptionProps = {
  isActive: boolean
  isAnySegmentActive: boolean
  icon: string
  alias: string
}

export const SegmentedControlOption = ({
  isActive,
  isAnySegmentActive,
  icon,
  alias,
}: SegmentedControlOptionProps) => (
  <div style={{ display: "flex", alignItems: "center" }}>
    <Icon
      className="icon"
      style={{
        color: isActive ? "white" : "var(--mantine-color-lime-filled)",
      }}
      path={icon}
      size={1}
    />
    <span
      style={{
        marginLeft: "4px",
        display: isActive && isAnySegmentActive ? "block" : "none",
        width: !isActive ? "0" : "auto",
      }}
    >
      {alias}
    </span>
  </div>
)
