import Image from "next/image"

export const Logo = () => (
  <Image
    src="/assets/icons/logo.svg"
    alt="EduCards Logo"
    width={30}
    height={30}
    // priority
    style={{ zIndex: "9999", marginLeft: "-48px" }}
  />
)
