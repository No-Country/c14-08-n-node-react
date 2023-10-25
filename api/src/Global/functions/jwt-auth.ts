import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UnauthorizedException } from '@nestjs/common';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    // Coloca cualquier lógica adicional de autorización aquí si es necesario.
    // Puedes acceder a la solicitud y sus datos, como el usuario decodificado, de esta manera:
    const request = context.switchToHttp().getRequest();
    const user = request.user; // El usuario decodificado

    if (!user) {
      throw new UnauthorizedException('No tienes acceso a esta ruta');
    }

    return super.canActivate(context);
  }
}
