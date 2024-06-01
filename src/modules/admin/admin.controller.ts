import httpStatus from 'http-status';
import catchAsync from '../../app/utils/catchAsync';
import sendResponse from '../../app/utils/sendResponse';
import { AdminServices } from './admin.service';

const getAllAdmins = catchAsync(async (req, res) => {
  const result = await AdminServices.getAllAdminsFromDB(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admins are retrieved successfully',
    data: result,
  });
});
const getSingleAdmin = catchAsync(async (req, res) => {
  const { adminId } = req.params;

  const result = await AdminServices.getSingleAdminFromDB(adminId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single Admin is retrieved successfully',
    data: result,
  });
});
const deleteSingleAdmin = catchAsync(async (req, res) => {
  const { adminId } = req.params;

  const result = await AdminServices.deleteSingleAdminFromDB(adminId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single Admin is deleted successfully',
    data: result,
  });
});
const updateSingleAdmin = catchAsync(async (req, res) => {
  const { adminId } = req.params;
  const { admin } = req.body;
  const result = await AdminServices.updateSingleAdminIntoDB(adminId, admin);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin is updated successfully',
    data: result,
  });
});
export const AdminControllers = {
  getAllAdmins,
  getSingleAdmin,
  deleteSingleAdmin,
  updateSingleAdmin,
};
