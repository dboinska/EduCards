import { createContext, useContext, useMemo, useState } from "react"

interface CompartionProps {
  header: string
  label: string
  color: string
}

const defaultCompartionProps = {
  header: "",
  label: "",
  color: "",
}

const CompartionContext = createContext({
  compartionProps: defaultCompartionProps,
  setCompartionProps: (props: CompartionProps) => {},
})

export const UseCompartion = () => useContext(CompartionContext)

export const CompartionProvider = ({ children }) => {
  const [compartionProps, setCompartionProps] = useState(defaultCompartionProps)

  const value = useMemo(
    () => ({
      compartionProps,
      setCompartionProps,
    }),
    [compartionProps, setCompartionProps]
  )

  return <CompartionContext.Provider value={value}>{children}</CompartionContext.Provider>
}
