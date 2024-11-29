export const isDateWithinRange = (endDate: string | Date): boolean => {
  const currentDate = new Date()
  return typeof endDate === "string" ? currentDate <= new Date(endDate) : currentDate <= endDate
}
