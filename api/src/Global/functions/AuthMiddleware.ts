import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  private readonly secretKey = 'tu_secreto+_secreto';

  use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(403).send({ message: 'Token no proporcionado.' });
    }

    jwt.verify(token, this.secretKey, (err, decoded) => {
      if (err) {
        return res.status(401).send({ message: 'Token no válido.' });
      }
      req['user'] = decoded; // Guardar el usuario decodificado en la solicitud
      next();
    });
  }
}

export async function generateToken(users: object) {
  const secretKey = 'tu_secreto+_secreto';
  return jwt.sign(users, secretKey, { expiresIn: '365d' });
}
