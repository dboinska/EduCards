import fs from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const __root = path.resolve(__dirname, "..")

const SOURCE_DIR = path.resolve(__root, ".next/standalone")
const STATIC_DIR = path.resolve(__root, ".next/static")
const PUBLIC_DIR = path.resolve(__root, "public")
const DIST_DIR = path.resolve(__root, "dist")
const TARGET_DIR = path.resolve(DIST_DIR, "educards")
const TARGET_STATIC_DIR = path.resolve(TARGET_DIR, ".next/static")
const TARGET_PUBLIC_DIR = path.resolve(TARGET_DIR, "public")

const getRelative = (to) => path.relative(__root, to)

async function postBuild(): Promise<void> {
  try {
    console.time("✅ Postbuild script finished in ")
    console.time("🔑 Checking directories...")
    try {
      await fs.access(SOURCE_DIR, fs.constants.R_OK | fs.constants.W_OK)
      await fs.access(STATIC_DIR, fs.constants.R_OK | fs.constants.W_OK)
    } catch (error) {
      console.error("🚫 No directories or insufficient permissions to move.")
      return
    }
    console.timeEnd("🔑 Checking directories...")

    console.time(`🧹 Cleaning ${getRelative(DIST_DIR)} directory...`)
    await fs.rm(DIST_DIR, { recursive: true, force: true })
    console.timeEnd(`🧹 Cleaning ${getRelative(DIST_DIR)} directory...`)

    console.time(
      `🚚 Moving content of ${getRelative(SOURCE_DIR)} into ${getRelative(TARGET_DIR)}...`
    )
    await fs.cp(SOURCE_DIR, TARGET_DIR, { recursive: true })
    console.timeEnd(
      `🚚 Moving content of ${getRelative(SOURCE_DIR)} into ${getRelative(TARGET_DIR)}...`
    )

    console.time(
      `📁 Moving content of ${getRelative(STATIC_DIR)} into ${getRelative(TARGET_STATIC_DIR)}...`
    )
    await fs.cp(STATIC_DIR, TARGET_STATIC_DIR, { recursive: true })
    console.timeEnd(
      `📁 Moving content of ${getRelative(STATIC_DIR)} into ${getRelative(TARGET_STATIC_DIR)}...`
    )

    console.time(
      `🗃️ Moving content of ${getRelative(PUBLIC_DIR)} into ${getRelative(TARGET_PUBLIC_DIR)}...`
    )
    await fs.cp(PUBLIC_DIR, TARGET_PUBLIC_DIR, {
      recursive: true,
      filter: (src) => !src.includes(path.join(PUBLIC_DIR, "upload")),
    })
    console.timeEnd(
      `🗃️ Moving content of ${getRelative(PUBLIC_DIR)} into ${getRelative(TARGET_PUBLIC_DIR)}...`
    )

    console.timeEnd("✅ Postbuild script finished in ")
  } catch (error) {
    console.error("❌ Error while moving files: ", error)
  }
}

postBuild().catch((error) => {
  console.error(error)
  process.exit(1)
})
