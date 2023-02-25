import { injectable } from 'inversify'
import { IValidation } from './leaves/contract'
import { EmailValidation } from './leaves/email'

@injectable()
export class UserValidation implements IValidation {
  private readonly validations: IValidation[] = [
    new EmailValidation('email')
  ]

  validate (input?: any) {
    this.validations.forEach(validation => {
      validation.validate(input)
    })
  }
}
