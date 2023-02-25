import { Route } from '@tsoa/runtime'
import { inject, injectable } from 'inversify'
import { Tags, Body, Post, Query, Security, Controller } from 'tsoa'

import { AuthServiceDTO, IAuthService } from '../../domain/services/auth'

@Route('/auth')
@Tags('auth')
@injectable()
export class AuthController extends Controller {
  constructor (
    @inject('AuthService') private readonly service: IAuthService
  ) {
    super()
  }

  @Post('sign-up')
  async signUp (@Body() input: AuthServiceDTO.SignUpInput): Promise<void> {
    await this.service.signUp(input)
  }

  @Post('sign-in')
  async signIn (@Body() input: AuthServiceDTO.SignInInput): Promise<AuthServiceDTO.SignInOutput> {
    return await this.service.signIn(input)
  }

  @Post('email-verification')
  async emailVerification (@Query() hash: string): Promise<void> {
    await this.service.verificateEmail(hash)
  }

  @Post('refresh-token')
  @Security('jwt')
  async refreshToken (): Promise<AuthServiceDTO.SignInOutput> {
    return await this.service.refreshToken()
  }
}
