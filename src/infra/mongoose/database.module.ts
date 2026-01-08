import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import {
  DATABASE_CONNECTION,
  PrincipalDatabaseConfig,
} from './mongoose-config.service'

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useClass: PrincipalDatabaseConfig,
      connectionName: DATABASE_CONNECTION.PRINCIPAL,
    }),
  ],
  exports: [MongooseModule],
})
export class DatabaseModule {}
