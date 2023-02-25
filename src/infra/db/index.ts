import mongoose from 'mongoose'

export const connect = async (uri: string = process.env.DB_URL!): Promise<void> => {
  mongoose.connection.on('connected', () => {
    console.info('DB connected')
  })

  mongoose.connection.on('error', (err: Error) => {
    console.error('DB connection error', err)
  })

  const { DB_NAME } = process.env

  await mongoose.connect(uri, {
    dbName: DB_NAME,
    ignoreUndefined: true
  })
}

export const disconnect = async (): Promise<void> => {
  await mongoose.disconnect()
}
