import { NextFunction, Request, Response } from 'express';
import catchAsync from './catchAsync';
import AppError from '../errors/AppError';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { TUserRole } from '../../modules/user/user.interface';
import { User } from '../../modules/user/user.model';

/* const auth = (...requiredRoles: TUserRole[]) => {
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
}; */
const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    //console.log(req.headers.authorization);
    const token = req.headers.authorization;
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized');
    }

    //check if the token is valid
    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string,
    ) as JwtPayload;

    const { role, userId, iat } = decoded;

    //check if the user exists or not
    const user = await User.isUserExistsByCustomId(userId);
    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'This user is not found!');
    }

    //   checking if the user is already deleted
    const isDeleted = user?.isDeleted;
    if (isDeleted) {
      throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !');
    }

    // checking if the user is blocked
    const userStatus = user?.status;
    if (userStatus === 'blocked') {
      throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked ! !');
    }

    // check the jwt issue before password change
    console.log(
      'check',
      User.isJWTIssuedBeforePasswordChanged(
        user?.passwordChangedAt as Date,
        iat as number,
      ),
    );

    // check the jwt issue before password change
    if (
      user.passwordChangedAt &&
      User.isJWTIssuedBeforePasswordChanged(
        user.passwordChangedAt,
        iat as number,
      )
    ) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        'You are not authorized rew !',
      );
    }
    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
    }
    req.user = decoded as JwtPayload;
    next();
  });
};
export default auth;
