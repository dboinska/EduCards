import fs from "node:fs"
import path from "node:path"
import { IncomingForm } from "formidable"

import type { NextApiRequest, NextApiResponse } from "next"
import type { File } from "formidable"

export const config = {
  api: {
    bodyParser: false,
  },
}

const UPLOAD_DIR = path.join(process.cwd(), "public", "upload/avatars")

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" })
  }

  const form = new IncomingForm({ uploadDir: UPLOAD_DIR, keepExtensions: true })

  form.parse(req, (err, _, files) => {
    if (err) {
      console.error(err)
      return res.status(500).json({ message: "Error parsing the file" })
    }

    const file = files.file?.[0] as File
    const filePath = path.join(UPLOAD_DIR, file.newFilename)

    fs.mkdirSync(UPLOAD_DIR, { recursive: true })

    fs.rename(file.filepath, filePath, (err) => {
      if (err) {
        console.error(err)
        return res.status(500).json({ message: "Error saving the file" })
      }

      console.log({ file })

      res.status(200).json({ fileURL: `/upload/avatars/${file.newFilename}` })
    })
  })
}

export default handler
