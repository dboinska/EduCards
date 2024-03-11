import Icon from "@mdi/react"
import classes from "../styles/BottomBar.module.css"
import { useNavigationLinks } from "@/hooks/useNavigationLinks"
import { SegmentedControl } from "@mantine/core"
import { useRouter } from "next/router"

type SegmentData = {
  label: JSX.Element
  value: string
}
//
export function BottomBar() {
  const { menuLinks, isCurrentPath, currentUser } = useNavigationLinks()

  const router = useRouter()

  const segmentsData = menuLinks.map((link) => {
    const isActive = router.asPath === link.path.href
    const isAnySegmentActive = menuLinks.some((link) => router.asPath === link.path.href)

    return {
      label: (
        <div style={{ display: "flex", alignItems: "center" }}>
          <Icon
            className="icon"
            style={{
              color: isActive ? "white" : "var(--mantine-color-lime-filled)",
            }}
            path={link.icon}
            size={1}
          />
          <span
            style={{
              marginLeft: "4px",
              display: isActive && isAnySegmentActive ? "block" : "none",
              width: !isActive ? "0" : "auto",
            }}
          >
            {link.alias}
          </span>
        </div>
      ),
      value: link.path.href,
    }
  })

  const handleSegmentChange = async (value: string) => {
    try {
      await router.push(value)
    } catch (error) {
      console.error("Error during navigation:", error)
    }
  }

  return (
    <SegmentedControl
      hiddenFrom="md"
      radius="xl"
      size="md"
      data={segmentsData}
      value={router.asPath}
      onChange={handleSegmentChange}
      classNames={classes}
    />
  )
}
