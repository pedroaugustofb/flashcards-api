import { Inject, Injectable } from '@nestjs/common'
import { UsersRepository } from './users.repository'
import { User } from './schemas/user.schema'
import { CreateUserDto } from './dtos/create-user.dto'

@Injectable()
export class UsersService {
  @Inject(UsersRepository)
  private usersRepository: UsersRepository

  async createUser(params: CreateUserDto): Promise<User> {
    const user = await this.usersRepository.findByFirebaseUid(
      params.firebaseUid,
    )

    if (user) throw new Error('User already exists')

    const createdUser = await this.usersRepository.create(User.make(params))

    return createdUser
  }
}
