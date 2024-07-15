import httpStatus from 'http-status';
import catchAsync from '../../app/utils/catchAsync';
import sendResponse from '../../app/utils/sendResponse';
import { EnrolledCourseServices } from './enrolledCourse.service';

const createEnrolledCourse = catchAsync(async (req, res) => {
  const userId = req.user.userId;
  const result = await EnrolledCourseServices.createEnrolledCourseIntoDB(
    userId,
    req.body,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is enrolled successfully',
    data: result,
  });
});
const getAllEnrolledCourses = catchAsync(async (req, res) => {});
const getMyEnrolledCourses = catchAsync(async (req, res) => {});
const updateEnrolledCourseMarks = catchAsync(async (req, res) => {});
export const EnrolledCourseControllers = {
  createEnrolledCourse,
  getAllEnrolledCourses,
  getMyEnrolledCourses,
  updateEnrolledCourseMarks,
};
