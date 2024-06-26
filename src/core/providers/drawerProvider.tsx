import { createContext, useContext, useMemo, useState } from "react"

interface DrawerProps {
  header: string
  label: string
  color: string
  learned: number
  left: number
}

const defaultDrawerProps = {
  header: "",
  label: "",
  color: "",
  learned: 0,
  left: 0,
}

const DrawerContext = createContext({
  drawerProps: defaultDrawerProps,
  setDrawerProps: (props: DrawerProps) => {},
})

export const UseDrawer = () => useContext(DrawerContext)

export const DrawerProvider = ({ children }) => {
  const [drawerProps, setDrawerProps] = useState<DrawerProps>(defaultDrawerProps)

  const value = useMemo(
    () => ({
      drawerProps,
      setDrawerProps,
    }),
    [drawerProps, setDrawerProps]
  )

  return <DrawerContext.Provider value={value}>{children}</DrawerContext.Provider>
}
