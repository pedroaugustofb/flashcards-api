import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

interface MakeProps {
  firebaseUid: string
  email: string
}

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ unique: true })
  firebaseUid: string

  @Prop()
  email: string

  static make(params: MakeProps) {
    if (!params.firebaseUid) throw Error('Firebase user id não informado.')
    if (!params.email) throw Error('Email não informado.')

    return params as User
  }
}

export const UserSchema = SchemaFactory.createForClass(User)

UserSchema.index({
  firebaseUid: 1,
})
