import { useState } from "react"
import { NumberInput, Slider } from "@mantine/core"
import classes from "src/styles/SliderInput.module.css"

type SliderProps = {
  error?: string
  label?: string
  placeholder?: string
  step?: number
  min: number
  max: number
  size?: any
  value?: number
  onChange?: any
}

export function SliderInput({
  error,
  label,
  placeholder,
  step,
  min,
  max,
  size,
  value,
  onChange,
}: SliderProps) {
  const handleSliderChange = (value) => {
    onChange(value)
  }

  const handleNumberInputChange = (value) => {
    if (value !== undefined) {
      onChange(value)
    }
  }

  return (
    <>
      <div className={classes.wrapper}>
        <NumberInput
          value={value}
          onChange={handleNumberInputChange}
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
          labelAlwaysOn
          value={typeof value === "string" ? 0 : value}
          onChangeEnd={handleSliderChange}
          size={size}
          className={classes.slider}
          classNames={classes}
        />
      </div>
      {error && <div style={{ color: "red", fontSize: "12px", paddingLeft: "12px" }}>{error}</div>}
    </>
  )
}
