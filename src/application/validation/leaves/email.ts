import { ApplicationError } from '../../../domain/errors/application'
import { IValidation } from './contract'

export class EmailValidation implements IValidation {
  private readonly PATTERN = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/

  constructor (
    private readonly field: string
  ) { }

  validate (input: any): void {
    if (!this.PATTERN.test(input[this.field])) throw new ApplicationError('Email inválido', 400)
  }
}
