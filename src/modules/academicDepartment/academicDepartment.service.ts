import { TAcademicDepartment } from './academicDepartment.interface';
import { AcademicDepartment } from './academicDepartment.model';

const createAcademicDepartmentIntoDB = async (payload: TAcademicDepartment) => {
  if (await AcademicDepartment.findOne({ name: payload.name })) {
    throw new Error('Academic department is already exists');
  }
  const result = await AcademicDepartment.create(payload);
  return result;
};
const getAllAcademicDepartmentsFromDB = async () => {
  const result = await AcademicDepartment.find().populate('academicFaculty');
  return result;
};
const getSingleAcademicDepartmentFromDB = async (departmentId: string) => {
  const result =
    await AcademicDepartment.findById(departmentId).populate('academicFaculty');
  return result;
};
const updateAcademicDepartmentIntoDB = async (
  departmentId: string,
  updateData: Partial<TAcademicDepartment>,
) => {
  const result = await AcademicDepartment.findOneAndUpdate(
    { _id: departmentId },
    { $set: updateData },
    {
      new: true,
      runValidators: true,
    },
  );
  return result;
};
const deleteAcademicDepartmentFromDB = async (departmentId: string) => {
  const result = await AcademicDepartment.deleteOne({ _id: departmentId });
  return result;
};
export const AcademicDepartmentServices = {
  createAcademicDepartmentIntoDB,
  getAllAcademicDepartmentsFromDB,
  getSingleAcademicDepartmentFromDB,
  updateAcademicDepartmentIntoDB,
  deleteAcademicDepartmentFromDB,
};
