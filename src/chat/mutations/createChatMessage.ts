import { resolver } from "@blitzjs/rpc"
import { ChatMessage } from "../schemas"

export default resolver.pipe(resolver.zod(ChatMessage), async ({ prompt }) => {
  console.log({ prompt })

  return
})
