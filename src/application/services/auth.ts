import { injectable, inject } from 'inversify'
import { Ticket, TicketSituation, TicketType } from '../../domain/entities/ticket'
import { User } from '../../domain/entities/user'
import { ApplicationError } from '../../domain/errors/application'
import { ITicketRepository } from '../../domain/repositories/ticket'
import { IUserRepository } from '../../domain/repositories/user'
import { AuthServiceDTO, IAuthService } from '../../domain/services/auth'
import { IHasher } from '../contracts/hasher'
import { IJwt } from '../contracts/jwt'
import { IMailer } from '../contracts/mailer'
import { ISessionManager } from '../contracts/session-getter'
import { IUuidGenerator } from '../contracts/uuid-generator'
import { IValidation } from '../validation/leaves/contract'

@injectable()
export class AuthService implements IAuthService {
  constructor (
    @inject('UserRepository') private readonly userRepository: IUserRepository,
    @inject('TicketRepository') private readonly ticketRepository: ITicketRepository,
    @inject('UuidGenerator') private readonly uuidGenerator: IUuidGenerator,
    @inject('Hasher') private readonly hasher: IHasher,
    @inject('Mailer') private readonly mailer: IMailer,
    @inject('Jwt') private readonly jwt: IJwt,
    @inject('UserValidation') private readonly userValidation: IValidation,
    @inject('SessionManager') private readonly sessionManager: ISessionManager
  ) { }

  async signIn (input: AuthServiceDTO.SignInInput): Promise<AuthServiceDTO.SignInOutput> {
    this.userValidation.validate(input)

    const user = await this.userRepository.findByEmail(input.email)

    if (!user) throw new ApplicationError('Usuário/senha incorretos', 400)

    const validPassword = this.hasher.compare(input.password, user.password)
    if (!validPassword) throw new ApplicationError('Usuário/senha incorretos', 400)

    const tickets = await this.ticketRepository.find({
      userId: user.id,
      type: TicketType.EMAIL_VERIFICATION
    })
    const ticket = tickets.sort((previous, current) => previous.createdAt.getTime() - current.createdAt.getTime()).pop()
    if (ticket?.situation !== TicketSituation.CLOSE) throw new ApplicationError('Usuário pendente de validação', 400)

    const { password, ...tokenData } = user
    const token = this.jwt.generate(tokenData, '1d')

    return {
      id: user.id,
      email: user.email,
      jwt: token,
      companyId: user.companyId,
      name: user.name
    }
  }

  async signUp (input: AuthServiceDTO.SignUpInput): Promise<void> {
    this.userValidation.validate(input)

    const exists = await this.userRepository.findByEmail(input.email)

    if (exists) throw new ApplicationError('Usuário já cadastrado', 400)

    const user = new User()

    user.id = this.uuidGenerator.generate()
    user.name = input.name
    user.email = input.email
    user.password = this.hasher.encrypt(input.password)

    await this.userRepository.save(user)

    const ticket: Ticket = {
      id: this.uuidGenerator.generate(),
      hash: this.hasher.encrypt(user.email),
      userId: user.id,
      situation: TicketSituation.OPEN,
      type: TicketType.EMAIL_VERIFICATION,
      createdAt: new Date()
    }

    await this.ticketRepository.save(ticket)

    await this.mailer.send({
      to: user.email,
      template: 'email-verification',
      data: {
        hash: ticket.hash,
        userId: user.id,
        name: user.name
      },
      subject: 'Verificação de email'
    })
  }

  async verificateEmail (hash: string): Promise<void> {
    const ticket = await this.ticketRepository.findByHash(hash)

    if (!ticket) throw new ApplicationError('Ticket não encontrado', 404)

    await this.ticketRepository.edit(ticket.id, {
      situation: TicketSituation.CLOSE
    })
  }

  async refreshToken (): Promise<AuthServiceDTO.SignInOutput> {
    const session = this.sessionManager.get()

    const newSession = {
      id: session.id,
      email: session.email,
      name: session.name,
      companyId: session.companyId
    }

    const jwt = this.jwt.generate(newSession, '1d')

    return {
      ...newSession,
      jwt
    }
  }
}
