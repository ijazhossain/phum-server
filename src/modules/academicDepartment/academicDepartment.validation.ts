import { z } from 'zod';

const createAcademicDepartmentValidationSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Department Name is required',
      invalid_type_error: 'Department name must be a string type',
    }),
    academicFaculty: z.string({
      required_error: 'Department Name is required',
      invalid_type_error: 'Department name must be a string type',
    }),
  }),
});
const updateAcademicDepartmentValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        invalid_type_error: 'Department name must be a string type',
      })
      .optional(),
    academicFaculty: z
      .string({
        invalid_type_error: 'Department name must be a string type',
      })
      .optional(),
  }),
});
export const AcademicDepartmentValidation = {
  createAcademicDepartmentValidationSchema,
  updateAcademicDepartmentValidationSchema,
};
