export const filterSessionByDate = (learnSessions, formattedDate) => {
  return learnSessions.filter((ls) => {
    if (!ls.sessionEnd) return false
    const sessionEndFormatted = new Date(ls.sessionEnd).toISOString().split("T")[0]
    return sessionEndFormatted === formattedDate
  })
}
