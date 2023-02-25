import cors from 'cors'

export const corsMiddleware = () => {
  return cors({
    origin: '*',
    methods: ['GET', 'HEAD', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  })
}
