import clsx from "clsx"

import { Stat, StatProps } from "./Stat"

import classes from "@/styles/Stats.module.css"

interface ActionableStatProps extends StatProps {
  onClick: () => void
  isActive?: boolean
}

export const ActionableStat = ({ title, value, onClick, isActive }: ActionableStatProps) => {
  const handleOnClick = () => {
    onClick?.()
  }
  return (
    <button
      className={clsx(classes.actionableStat, isActive && classes.active)}
      onClick={handleOnClick}
    >
      <Stat value={value} title={title} className={classes.stat} />
    </button>
  )
}
