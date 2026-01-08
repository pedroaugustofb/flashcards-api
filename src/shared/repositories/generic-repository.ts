import { Model } from 'mongoose'

export class GenericRepository<T> {
  constructor(protected readonly model: Model<T>) {}

  public async create(entity: T) {
    return await this.model.create(entity)
  }
}
