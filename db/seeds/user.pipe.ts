import db from "../index"
import { generatePerson } from "./user.seed"
import { pipe } from "../utils/pipe"

import type { User } from "../index"

type UserPipelineData = {
  user?: ReturnType<typeof generatePerson>[]
  savedUsers?: User[]
}

const prepareUsers = async (data: UserPipelineData): Promise<UserPipelineData> => ({
  ...data,
  user: Array.from({ length: 10 }, generatePerson),
})

const commitUsers = async (data: UserPipelineData): Promise<UserPipelineData> => {
  const savedUsers = await db.user.createManyAndReturn({
    data: data.user!,
    skipDuplicates: true,
  })

  return { ...data, savedUsers }
}

export const createUsers = () => pipe(prepareUsers, commitUsers)({})
