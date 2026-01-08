import { Injectable } from '@nestjs/common'
import { User } from './schemas/user.schema'
import { GenericRepository } from 'src/shared/repositories/generic-repository'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

@Injectable()
export class UsersRepository extends GenericRepository<User> {
  constructor(
    @InjectModel(User.name)
    userModel: Model<User>,
  ) {
    super(userModel)
  }

  async findByFirebaseUid(id: string): Promise<User | null> {
    return await this.model.findOne({ firebaseUid: id })
  }
}
