import { ApplicationError } from '../../../domain/errors/application'
import { IValidation } from './contract'

export class RequiredFieldValidation implements IValidation {
  constructor (
    private readonly field: string,
    private readonly alias: string
  ) { }

  validate (input: any): void {
    if (!input[this.field]) throw new ApplicationError(`Campo ${this.alias} vazio`, 400)
  }
}
