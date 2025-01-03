import OpenAI from "openai"
import { invoke } from "@blitzjs/rpc"
import getApiKey from "@/modules/user/queries/getApiKey"
import { decrypt } from "./crypto"

export interface ApiKeyData {
  iv: string
  key: string
}

export async function createOpenAIClient() {
  const encryptedApiKey = (await invoke(getApiKey, null)) as ApiKeyData

  if (!encryptedApiKey || !encryptedApiKey.iv || !encryptedApiKey.key) {
    throw new Error("API key not found or invalid format")
  }

  const decryptedApiKey = decrypt({
    iv: encryptedApiKey.iv,
    encryptedData: encryptedApiKey.key,
  })

  return new OpenAI({
    apiKey: decryptedApiKey,
    dangerouslyAllowBrowser: true,
  })
}
