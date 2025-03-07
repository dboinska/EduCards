// @ts-check
const { withBlitz } = require("@blitzjs/next")

/**
 * @type {import('@blitzjs/next').BlitzConfig}
 **/
const config = {
  output: "standalone",
  images: {
    domains: ["localhost"],
  },
}

module.exports = withBlitz(config)
