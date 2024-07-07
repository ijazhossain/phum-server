import httpStatus from 'http-status';
import sendResponse from '../../app/utils/sendResponse';
import { AuthServices } from './auth.service';
import catchAsync from '../../app/utils/catchAsync';

const loginUser = catchAsync(async (req, res) => {
  const result = await AuthServices.loginUser(req.body);
  const { accessToken, needsPasswordChange } = result;
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is logged in successfully!',
    data: {
      accessToken,
      needsPasswordChange,
    },
  });
});
const changePassword = catchAsync(async (req, res) => {
  const { ...passwordData } = req.body;
  const result = await AuthServices.changePassword(req.user, passwordData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Password changed successfully!',
    data: result,
  });
});
export const AuthControllers = {
  loginUser,
  changePassword,
};
