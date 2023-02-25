import { Session } from '../models/session'

export interface ISessionManager {
  get: () => Session
  set: (token: string) => void
}
