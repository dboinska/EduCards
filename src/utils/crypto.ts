import crypto from "crypto"

const ALGORITHM = "aes-256-cbc"
const IV_LENGTH = 16
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY!

export function encrypt(text: string) {
  const key = Buffer.from(ENCRYPTION_KEY, "hex")

  const iv = crypto.randomBytes(IV_LENGTH)

  //  @ts-ignore
  const cipher = crypto.createCipheriv(ALGORITHM, key, iv)

  let encrypted = cipher.update(text, "utf8", "hex")
  encrypted += cipher.final("hex")

  return {
    iv: iv.toString("hex"),
    encryptedData: encrypted,
  }
}

export function decrypt({ iv, encryptedData }: { iv: string; encryptedData: string }) {
  try {
    const key = Buffer.from(ENCRYPTION_KEY, "hex")

    const ivBuffer = Buffer.from(iv, "hex")

    // @ts-ignore
    const decipher = crypto.createDecipheriv(ALGORITHM, key, ivBuffer)

    let decrypted = decipher.update(encryptedData, "hex", "utf8")
    decrypted += decipher.final("utf8")

    return decrypted
  } catch (error) {
    console.error("Decryption error:", {
      ivLength: iv.length,
      encryptedDataLength: encryptedData.length,
      error,
    })
    throw new Error("Failed to decrypt API key")
  }
}
