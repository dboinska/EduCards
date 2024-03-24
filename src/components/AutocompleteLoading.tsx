import { useState, useRef } from "react"
import { Autocomplete, Loader } from "@mantine/core"

export function AutocompleteLoading() {
  const timeoutRef = useRef<number>(-1)
  const [value, setValue] = useState("")
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<string[]>([])

  const handleChange = (val: string) => {
    window.clearTimeout(timeoutRef.current)
    setValue(val)
    setData([])

    if (val.trim().length === 0) {
      setLoading(false)
    } else {
      setLoading(true)
      timeoutRef.current = window.setTimeout(() => {
        setLoading(false)
        // setData(["English", "French", "German"].map((provider) => `${val}@${provider}`))
      }, 1000)
    }
  }
  return (
    <Autocomplete
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "4px",
      }}
      value={value}
      data={data}
      radius="xl"
      size="sm"
      onChange={handleChange}
      rightSection={loading ? <Loader size="1rem" /> : null}
      label="Search for:"
      placeholder="Search"
    />
  )
}
