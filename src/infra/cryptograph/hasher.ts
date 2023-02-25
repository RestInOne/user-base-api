import bcrypt from 'bcryptjs'
import { injectable } from 'inversify'
import { IHasher } from '../../application/contracts/hasher'

@injectable()
export class Hasher implements IHasher {
  private readonly SALT = 10

  encrypt (value: string): string {
    return bcrypt.hashSync(value, this.SALT)
  }

  compare (given: string, toCompare: string): boolean {
    return bcrypt.compareSync(given, toCompare)
  }
}
