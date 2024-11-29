export const filterSessionsByRange = (learnSessions, lastMonday, nextSunday) => {
  return learnSessions.filter((ls) => {
    if (!ls.sessionEnd) return false
    const sessionDate = new Date(ls.sessionStart)
    return sessionDate >= lastMonday && sessionDate <= nextSunday
  })
}
