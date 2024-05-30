import httpStatus from 'http-status';
import AppError from '../../app/errors/AppError';
import { Faculty } from './faculty.model';
import { User } from '../user/user.model';
import mongoose from 'mongoose';

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
const deleteSingleFacultyFromDB = async (id: string) => {
  if (!(await Faculty.isFacultyExists(id))) {
    throw new AppError(httpStatus.NOT_FOUND, 'Faculty does not exists');
  }
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const deletedUser = await User.updateOne(
      { id },
      { isDeleted: true },
      { new: true, session },
    );
    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete user');
    }
    const deletedFaculty = await Faculty.updateOne(
      { id },
      { isDeleted: true },
      { new: true, session },
    );
    if (!deletedFaculty) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete faculty');
    }
    await session.commitTransaction();
    await session.endSession();
    return deletedFaculty;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    console.log(err);
  }
};
export const FacultyServices = {
  getAllFacultiesFromDB,
  getSingleFacultyFromDB,
  deleteSingleFacultyFromDB,
};
