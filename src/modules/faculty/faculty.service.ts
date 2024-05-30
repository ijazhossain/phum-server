import httpStatus from 'http-status';
import AppError from '../../app/errors/AppError';
import { Faculty } from './faculty.model';

const getAllFacultiesFromDB = async () => {
  const result = await Faculty.find();
  return result;
};
const getSingleFacultyFromDB = async (id: string) => {
  if (!(await Faculty.isFacultyExists(id))) {
    throw new AppError(httpStatus.NOT_FOUND, 'Faculty does not exists');
  }
  const result = await Faculty.findOne({ id });
  return result;
};
export const FacultyServices = {
  getAllFacultiesFromDB,
  getSingleFacultyFromDB,
};
