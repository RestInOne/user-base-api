import { injectable, inject } from 'inversify'
import { IJwt } from '../../application/contracts/jwt'
import { ISessionManager } from '../../application/contracts/session-getter'
import { IStorage, StorageKeys } from '../../application/contracts/storage'
import { Session } from '../../application/models/session'

@injectable()
export class SessionManager implements ISessionManager {
  constructor (
    @inject('Jwt') private readonly jwt: IJwt,
    @inject('Storage') private readonly storage: IStorage
  ) { }

  set (token: string) {
    const session = this.jwt.verify(token)
    this.storage.set(StorageKeys.TOKEN, session)
  }

  get (): Session {
    return this.storage.get(StorageKeys.TOKEN)
  }
}
