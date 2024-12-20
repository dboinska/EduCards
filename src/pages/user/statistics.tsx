import { UserStatisticsView } from "@/modules/user/views/userStatistics.view"

import type { BlitzPage } from "@blitzjs/next"

export interface StatisticsProps {
  id: number
  image?: string
  header: string
  desc?: string
  isFavorite?: boolean
  authorId: number
}

const Statistics: BlitzPage<Partial<StatisticsProps>> = ({
  id,
  image,
  header,
  desc,
  isFavorite,
  authorId,
}) => <UserStatisticsView />

export default Statistics
