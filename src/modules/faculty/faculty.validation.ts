import { z } from 'zod';
import { BloodGroup, Gender } from './faculty.constant';

const userNameValidationSchema = z.object({
  firstName: z.string().min(1).max(255),
  middleName: z.string().min(1).max(255),
  lastName: z.string().min(1).max(255),
});
const updateUserNameValidationSchema = z.object({
  firstName: z.string().min(1).max(255).optional(),
  middleName: z.string().min(1).max(255).optional(),
  lastName: z.string().min(1).max(255).optional(),
});

const createFacultyValidationSchema = z.object({
  body: z.object({
    password: z.string().max(20).optional(),
    faculty: z.object({
      designation: z.string().min(1).max(255),
      name: userNameValidationSchema,
      gender: z.enum([...Gender] as [string, ...string[]]),
      dateOfBirth: z.string().optional(),
      email: z.string().email(),
      contactNo: z.string(),
      emergencyContactNo: z.string(),
      bloodGroup: z.enum([...BloodGroup] as [string, ...string[]]),
      presentAddress: z.string(),
      permanentAddress: z.string(),
      // profileImg: z.string().optional(),
      academicDepartment: z.string(),
    }),
  }),
});
const updateFacultyValidationSchema = z.object({
  body: z.object({
    password: z.string().max(20).optional(),
    faculty: z.object({
      designation: z.string().min(1).max(255).optional(),
      name: updateUserNameValidationSchema.optional(),
      gender: z.enum([...Gender] as [string, ...string[]]).optional(),
      dateOfBirth: z.string().optional().optional(),
      email: z.string().email().optional(),
      contactNo: z.string().optional(),
      emergencyContactNo: z.string().optional(),
      bloodGroup: z.enum([...BloodGroup] as [string, ...string[]]).optional(),
      presentAddress: z.string().optional(),
      permanentAddress: z.string().optional(),
      // profileImg: z.string().optional().optional(),
      academicDepartment: z.string().optional(),
      isDeleted: z.boolean().optional(),
    }),
  }),
});

export const facultyValidations = {
  createFacultyValidationSchema,
  updateFacultyValidationSchema,
};
