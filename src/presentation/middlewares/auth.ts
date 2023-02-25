import { Request } from 'express'
import { ISessionManager } from '../../application/contracts/session-getter'
import { ApplicationError } from '../../domain/errors/application'
import { iocContainer } from '../ioc'

export const expressAuthentication = async (req: Request, securityName: string, scopes?: string[]) => {
  const token = req.headers.authorization
  if (!token) throw new ApplicationError('Token not provided', 401)
  const [type, rest] = token?.split(' ')
  if (type !== 'Bearer' || !rest) throw new ApplicationError('Token malformed', 401)
  try {
    const sessionManager = iocContainer.get<ISessionManager>('SessionManager')
    sessionManager.set(rest)
  } catch (error) {
    throw new ApplicationError('Invalid token', 401)
  }
}
