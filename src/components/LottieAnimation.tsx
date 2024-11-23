import Lottie from "lottie-react"
import React from "react"

interface LottieAnimationProps {
  animationData: any
  loop?: boolean
  style?: React.CSSProperties
}

const LottieAnimation: React.FC<LottieAnimationProps> = ({
  animationData,
  loop = false,
  style,
}) => {
  return <Lottie animationData={animationData} loop={loop} style={style} />
}

export default LottieAnimation
