export const getCompletionPercentage = (catalog) => {
  const catalogDrawers = catalog?.drawers
  const totalCards = catalog?.numberOfCards
  const lastDrawer = Array.isArray(catalogDrawers)
    ? catalogDrawers[catalogDrawers.length - 1]?.numberOfCards
    : 0

  return totalCards && lastDrawer ? Number((lastDrawer / totalCards) * 100).toFixed(0) : 0
}
