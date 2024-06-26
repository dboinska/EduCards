import { useState, useRef } from "react"
import { Autocomplete, Loader } from "@mantine/core"
import { useRouter } from "next/router"

type AutocompleteLoadingProps = {
  pathname?: string
}

export function AutocompleteLoading({ pathname }: AutocompleteLoadingProps) {
  const timeoutRef = useRef<number>(-1)
  const [value, setValue] = useState("")
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<string[]>([])

  const router = useRouter()

  const handleChange = async (val: string) => {
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
    try {
      await router.push({
        pathname: pathname,
        query: { ...router.query, search: val },
      })
    } catch (error) {
      console.error("Failed to navigate", error)
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
