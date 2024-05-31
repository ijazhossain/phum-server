import httpStatus from 'http-status';
import catchAsync from '../../app/utils/catchAsync';
import sendResponse from '../../app/utils/sendResponse';
import { FacultyServices } from './faculty.service';

const getAllFaculties = catchAsync(async (req, res) => {
  const result = await FacultyServices.getAllFacultiesFromDB(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculties are retrieved successfully',
    data: result,
  });
});
const getSingleFaculty = catchAsync(async (req, res) => {
  const { facultyId } = req.params;

  const result = await FacultyServices.getSingleFacultyFromDB(facultyId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single Faculty is retrieved successfully',
    data: result,
  });
});
const deleteSingleFaculty = catchAsync(async (req, res) => {
  const { facultyId } = req.params;

  const result = await FacultyServices.deleteSingleFacultyFromDB(facultyId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single Faculty is deleted successfully',
    data: result,
  });
});
const updateSingleFaculty = catchAsync(async (req, res) => {
  const { facultyId } = req.params;
  const { faculty } = req.body;
  const result = await FacultyServices.updateSingleFacultyIntoDB(
    facultyId,
    faculty,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty is updated successfully',
    data: result,
  });
});
export const FacultyControllers = {
  getAllFaculties,
  getSingleFaculty,
  deleteSingleFaculty,
  updateSingleFaculty,
};
