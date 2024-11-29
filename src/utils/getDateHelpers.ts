export const getDateHelpers = () => {
  const today = new Date()
  const formattedDate = today.toISOString().split("T")[0] // "YYYY-MM-DD"

  const lastMonday = new Date()
  lastMonday.setDate(lastMonday.getDate() - ((lastMonday.getDay() + 6) % 7))

  const nextSunday = new Date()
  nextSunday.setDate(nextSunday.getDate() + (7 - nextSunday.getDay()))

  return { today, formattedDate, lastMonday, nextSunday }
}
