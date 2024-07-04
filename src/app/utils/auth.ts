import { NextFunction, Request, Response } from 'express';
import catchAsync from './catchAsync';
import AppError from '../errors/AppError';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { TUserRole } from '../../modules/user/user.interface';

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    //console.log(req.headers.authorization);
    const token = req.headers.authorization;
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized');
    }
    //check if the token is valid
    jwt.verify(
      token,
      config.jwt_access_secret as string,
      function (err, decoded) {
        //err
        if (err) {
          throw new AppError(
            httpStatus.UNAUTHORIZED,
            'You are not authorized!',
          );
        }
        //checking the required role is matched with decoded role
        const role = (decoded as JwtPayload).role;
        if (requiredRoles && !requiredRoles.includes(role)) {
          throw new AppError(
            httpStatus.UNAUTHORIZED,
            'You are not authorized!',
          );
        }
        req.user = decoded as JwtPayload;
      },
    );
    next();
  });
};
export default auth;
