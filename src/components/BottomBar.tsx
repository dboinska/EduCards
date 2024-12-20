import Icon from "@mdi/react"
import classes from "../styles/BottomBar.module.css"
import { useNavigationLinks } from "@/hooks/useNavigationLinks"
import { SegmentedControl } from "@mantine/core"
import { useRouter } from "next/router"
import { SegmentedControlOption } from "./SegmentedControlOption"

type SegmentData = {
  label: React.ReactNode
  value: string
}

export function BottomBar() {
  const { menuLinks, isCurrentPath, currentUser } = useNavigationLinks()

  const router = useRouter()

  const segmentsData = menuLinks.map((link) => {
    const isActive = router.asPath === link.path.href
    const isAnySegmentActive = menuLinks.some((link) => router.asPath === link.path.href)

    return {
      label: (
        <SegmentedControlOption
          isActive={isActive}
          isAnySegmentActive={isAnySegmentActive}
          icon={link.icon}
          alias={link.alias}
        />
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
