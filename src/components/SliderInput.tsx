import { useState } from "react"
import { NumberInput, Slider } from "@mantine/core"
import classes from "src/styles/SliderInput.module.css"

export function SliderInput({ label, placeholder, step, min, max, size }) {
  const [value, setValue] = useState<number | string>(max)
  return (
    <div className={classes.wrapper}>
      <NumberInput
        value={value}
        onChange={setValue}
        label={label}
        placeholder={placeholder}
        step={step}
        min={min}
        max={max}
        hideControls
        classNames={{ input: classes.input, label: classes.label }}
      />
      <Slider
        max={max}
        step={step}
        min={min}
        label={null}
        value={typeof value === "string" ? 0 : value}
        onChange={setValue}
        size={size}
        className={classes.slider}
        classNames={classes}
      />
    </div>
  )
}
