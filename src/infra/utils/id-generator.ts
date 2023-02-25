import { injectable } from 'inversify'
import * as uuid from 'uuid'
import { IUuidGenerator } from '../../application/contracts/uuid-generator'

@injectable()
export class UuidGenerator implements IUuidGenerator {
  generate (): string {
    return uuid.v4()
  }
}
