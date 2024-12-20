import dynamic from "next/dynamic"

interface LottieAnimationProps {
  animationData: any
  loop?: boolean
  style?: React.CSSProperties
}

const Lottie = dynamic(() => import("lottie-react"), { ssr: false })

const LottieAnimation = ({ animationData, loop = false, style }: LottieAnimationProps) => (
  <Lottie animationData={animationData} loop={loop} style={style} />
)

export default LottieAnimation
