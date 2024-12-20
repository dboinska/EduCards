const DRAWER_OPTIONS = ["3", "5", "7"] as const
type DrawerOption = (typeof DRAWER_OPTIONS)[number]

export const getRandomDrawerAmount = (): DrawerOption => {
  return DRAWER_OPTIONS[Math.floor(Math.random() * DRAWER_OPTIONS.length)] as DrawerOption
}
