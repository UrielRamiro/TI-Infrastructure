// import './config/environment'
import express from 'express'
import { logger } from './util/tools/logger'
import { createRouter } from './util/arch/routing'
import * as modules from './modules'

main()

async function main() {
  const app = express()

  app.disable('x-powered-by')

  app.use(express.json({ limit: '2mb' }))
  app.use(express.urlencoded({ extended: true }))

  app.use(createRouter(modules.test))
  app.use(createRouter(modules.healtCheck))

  const port = Number("8080")
  app.listen(port, () => {
    // await logger.info('[v3.0] listening on port', port)
  })
}
