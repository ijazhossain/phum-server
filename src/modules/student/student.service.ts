import mongoose from 'mongoose';
import { Student } from './student.model';
import AppError from '../../app/errors/AppError';
import httpStatus, { BAD_REQUEST } from 'http-status';
import { User } from '../user/user.model';
import { TStudent } from './student.interface';
import QueryBuilder from '../../app/builder/QueryBuilder';
import { searchableFields } from './student.constant';

const getAllStudentsFromDB = async (query: Record<string, unknown>) => {
  //
  const studentQuery = new QueryBuilder(Student.find(), query)
    .search(searchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await studentQuery.modelQuery;
  return result;
};
/* const getAllStudentsFromDB = async (query: Record<string, unknown>) => {
  const queryObj = { ...query }; //copy
  const searchableFields = ['email', 'name.firstName', 'presentAddress'];
  let searchTerm = '';
  if (query?.searchTerm) {
    searchTerm = query?.searchTerm as string;
  }
  const searchQuery = Student.find({
    $or: searchableFields.map((field) => ({
      [field]: { $regex: searchTerm, $options: 'i' },
    })),
  });
  // Filtering
  const excludeFields = ['searchTerm', 'sort', 'limit', 'page', 'fields'];
  excludeFields.forEach((el) => delete queryObj[el]);
  console.log({ query }, { queryObj });
  const filterQuery = searchQuery
    .find(queryObj)
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });
  let sort = '-createdAt';
  if (query.sort) {
    sort = query.sort as string;
  }
  const sortQuery = filterQuery.sort(sort);
  let page = 1;
  let limit = 1;
  let skip = 0;
  if (query.limit) {
    limit = Number(query.limit);
  }
  if (query.page) {
    page = Number(query.page);
    skip = (page - 1) * limit;
  }
  const paginateQuery = sortQuery.skip(skip);

  const limitQuery = paginateQuery.limit(limit);
  // field limiting
  let fields = '-__v';
  if (query.fields) {
    fields = (query.fields as string).split(',').join(' ');
    // console.log({ fields });
  }
  const fieldQuery = await limitQuery.select(fields);
  return fieldQuery;
}; */
const getSingleStudentFromDB = async (id: string) => {
  if (!(await Student.isUserExists(id))) {
    throw new AppError(BAD_REQUEST, 'Student do not found');
  }
  const result = await Student.findOne({ id })
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });

  return result;
};
const updateSingleStudentIntoDB = async (
  id: string,
  payload: Partial<TStudent>,
) => {
  if (!(await Student.isUserExists(id))) {
    throw new AppError(BAD_REQUEST, 'Student do not found');
  }
  const { name, guardian, localGuardian, ...remainingStudentData } = payload;
  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingStudentData,
  };
  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }
  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedUpdatedData[`guardian.${key}`] = value;
    }
  }

  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedUpdatedData[`localGuardian.${key}`] = value;
    }
  }
  const result = await Student.findOneAndUpdate({ id }, modifiedUpdatedData, {
    new: true,
    runValidators: true,
  });
  return result;
};
const deleteStudentFromDB = async (id: string) => {
  if (!(await Student.isUserExists(id))) {
    throw new AppError(BAD_REQUEST, 'Student do not found');
  }

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const deletedStudent = await Student.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );
    if (!deletedStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete Student');
    }
    const deletedUser = await User.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );
    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete User');
    }
    await session.commitTransaction();
    await session.endSession();
    return deletedStudent;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error('Failed to delete student');
  }
};
export const StudentServices = {
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  updateSingleStudentIntoDB,
  deleteStudentFromDB,
};
