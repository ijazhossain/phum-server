import httpStatus from 'http-status';
import AppError from '../../app/errors/AppError';
import { User } from '../user/user.model';
import mongoose from 'mongoose';
import { Admin } from './admin.model';
import { TAdmin } from './admin.interface';
import QueryBuilder from '../../app/builder/QueryBuilder';
import { AdminSearchableFields } from './admin.constant';

/* const getAllAdminsFromDB = async (query: Record<string, unknown>) => {
  const queryObj = { ...query }; //copy
  // {email:{$regex:query.searchTerm, $options:'i'}}
  // {presentAddress:{$regex:query.searchTerm, $options:'i'}}
  // {name.firstName:{$regex:query.searchTerm, $options:'i'}}
  const studentSearchableFields = ['email', 'name.firstName', 'presentAddress'];
  let searchTerm = '';
  if (query?.searchTerm) {
    searchTerm = query?.searchTerm as string;
  }
  const searchQuery = Admin.find({
    $or: studentSearchableFields.map((field) => ({
      [field]: { $regex: searchTerm, $options: 'i' },
    })),
  });
  // filtering
  const excludeFields = ['searchTerm', 'sort', 'limit', 'page', 'fields'];
  excludeFields.forEach((el) => delete queryObj[el]);
  const filterQuery = searchQuery.find(queryObj);
  let sort = '-createdAt';
  if (query?.sort) {
    sort = query.sort as string;
  }
  const sortQuery = filterQuery.sort(sort);
  let page = 1;
  let limit = 10;
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
  // field Limiting
  let fields = '-__v';
  if (query.fields) {
    fields = (query.fields as string).split(',').join(' ');
  }
  const fieldQuery = await limitQuery.select(fields);
  return fieldQuery;
}; */
const getAllAdminsFromDB = async (query: Record<string, unknown>) => {
  const adminQuery = new QueryBuilder(Admin.find(), query)
    .search(AdminSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await adminQuery.modelQuery;
  const meta = await adminQuery.countTotal();
  return {
    result,
    meta,
  };
};
const getSingleAdminFromDB = async (id: string) => {
  if (!(await Admin.isAdminExists(id))) {
    throw new AppError(httpStatus.NOT_FOUND, 'Admin does not exists');
  }
  const result = await Admin.findById(id);
  return result;
};
const deleteSingleAdminFromDB = async (id: string) => {
  if (!(await Admin.isAdminExists(id))) {
    throw new AppError(httpStatus.NOT_FOUND, 'Admin does not exists');
  }
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const deletedAdmin = await Admin.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true, session },
    );
    if (!deletedAdmin) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete Admin');
    }
    const userId = deletedAdmin.user;
    const deletedUser = await User.findByIdAndUpdate(
      userId,
      { isDeleted: true },
      { new: true, session },
    );
    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete user');
    }

    await session.commitTransaction();
    await session.endSession();
    return deletedAdmin;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();

    throw new Error(err);
  }
};
const updateSingleAdminIntoDB = async (
  id: string,
  payload: Partial<TAdmin>,
) => {
  if (!(await Admin.isAdminExists(id))) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Admin do not found');
  }
  const { name, ...remainingFacultyData } = payload;
  const modifiedUpdateData: Record<string, unknown> = {
    ...remainingFacultyData,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdateData[`name.${key}`] = value;
    }
  }

  const result = await Admin.findByIdAndUpdate(id, modifiedUpdateData, {
    new: true,
    runValidators: true,
  });
  return result;
};
export const AdminServices = {
  getAllAdminsFromDB,
  getSingleAdminFromDB,
  deleteSingleAdminFromDB,
  updateSingleAdminIntoDB,
};
