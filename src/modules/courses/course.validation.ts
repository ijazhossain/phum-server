import { z } from 'zod';
const PreRequisiteCourseValidationSchema = z.object({
  course: z.string(),
  isDeleted: z.boolean().optional(),
});
const createCourseValidationSchema = z.object({
  body: z.object({
    title: z.string(),
    prefix: z.string(),
    code: z.number(),
    preRequisiteCourses: z.array(PreRequisiteCourseValidationSchema).optional(),
  }),
});
const updateCourseValidationSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    prefix: z.string().optional(),
    code: z.number().optional(),
    preRequisiteCourses: z.array(PreRequisiteCourseValidationSchema).optional(),
  }),
});
export const CourseValidations = {
  createCourseValidationSchema,
  updateCourseValidationSchema,
};
