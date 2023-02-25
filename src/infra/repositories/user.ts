import { injectable } from 'inversify'
import { User } from '../../domain/entities/user'
import { IUserRepository } from '../../domain/repositories/user'
import { UserMongoDBModel } from '../db/models/user'

@injectable()
export class UserRepository implements IUserRepository {
  private toModel (data: any): User {
    const model = new User()

    model.id = data.id
    model.name = data.name
    model.password = data.password
    model.email = data.email
    model.companyId = data.companyId

    return model
  }

  async save (user: User): Promise<User> {
    const userData = await UserMongoDBModel.create(user)
    
    return this.toModel(userData)
  }

  async findByEmail (email: string): Promise<User | null> {
    const userData = await UserMongoDBModel.findOne({ email })
    
    if (!userData) return null

    return this.toModel(userData)
  }
}
