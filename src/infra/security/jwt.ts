import { injectable } from 'inversify'
import jwt from 'jsonwebtoken'
import { IJwt } from '../../application/contracts/jwt'
import { ApplicationError } from '../../domain/errors/application'

@injectable()
export class Jwt implements IJwt {
  private readonly privateKey = process.env.PRIVATE_KEY!

  generate (data: any, expires: string): string {
    return jwt.sign(data, this.privateKey, { expiresIn: expires })
  }

  verify (token: string): any {
    try {
      const data = jwt.verify(token, this.privateKey, { complete: true })
      return data.payload
    } catch (error) {
      throw new ApplicationError('Token inválido', 401)
    }
  }
}
