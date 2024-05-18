import { z } from 'zod';

const createAcademicDepartmentValidationSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Depart Name is required',
      invalid_type_error: 'Department name must be a string type',
    }),
  }),
});
const updateAcademicDepartmentValidationSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Depart Name is required',
      invalid_type_error: 'Department name must be a string type',
    }),
  }),
});
export const AcademicDepartmentValidation = {
  createAcademicDepartmentValidationSchema,
  updateAcademicDepartmentValidationSchema,
};
