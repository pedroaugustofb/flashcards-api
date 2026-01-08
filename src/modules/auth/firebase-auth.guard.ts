import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { firebaseAdmin } from '../../shared/firebase/firebase.provider'
import { Reflector } from '@nestjs/core'
import { IS_PUBLIC_KEY } from 'src/infra/decorators/auth/public.decorator'

@Injectable()
export class FirebaseAuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ])

    if (isPublic) return true

    const request = context.switchToHttp().getRequest()
    const authHeader = request.headers.authorization

    if (!authHeader) throw new UnauthorizedException()

    const token = authHeader.replace('Bearer ', '')

    try {
      const decoded = await firebaseAdmin.auth().verifyIdToken(token)
      request.user = decoded
      return true
    } catch {
      throw new UnauthorizedException()
    }
  }
}
