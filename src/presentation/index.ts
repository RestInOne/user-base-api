import express from 'express'
import dotenv from 'dotenv'
import swaggerUi from 'swagger-ui-express'
import { createServer } from 'http'
import { RegisterRoutes } from './routes'
import swaggerDocument from './swagger.json'
import { notFoundMiddleware } from './middlewares/not-found'
import { errorHandlingMiddleware } from './middlewares/error-handling'
import { corsMiddleware } from './middlewares/cors'
import { connect } from '../infra/db'

const initApp = async () => {
  try {
    dotenv.config()

    const app = express()

    app.use(corsMiddleware())

    app.use(express.json({ limit: '50mb' }))

    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

    RegisterRoutes(app)

    app.use(notFoundMiddleware)

    app.use(errorHandlingMiddleware)

    await connect()

    const server = createServer(app)

    const port = process.env.PORT || 5050

    server.listen(port, () => {
      console.log(`Server running at port ${port}`)
    })
  } catch (error) {
    console.error('Error initializing server: ', error)
  }
}

initApp()
