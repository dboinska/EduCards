import { useState, useEffect } from "react"

const useFromValidity = (form) => {
  const [isFormValid, setIsFormValid] = useState(true)

  useEffect(() => {
    const errors = form.validate()
    setIsFormValid(!errors.hasErrors)
  }, [form, form.values])

  return isFormValid
}
export default useFromValidity
