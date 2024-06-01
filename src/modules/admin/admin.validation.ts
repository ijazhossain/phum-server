import { z } from 'zod';
import { BloodGroup, Gender } from './admin.constant';

// Define the Zod schema for the admin name
const adminNameSchema = z.object({
  firstName: z.string(),
  middleName: z.string().optional(),
  lastName: z.string(),
});
const updateAdminNameSchema = z.object({
  firstName: z.string().optional(),
  middleName: z.string().optional(),
  lastName: z.string().optional(),
});

// Define the Zod schema for the admin
const createAdminValidationSchema = z.object({
  body: z.object({
    password: z.string().max(20).optional(),
    admin: z.object({
      name: adminNameSchema,
      gender: z.enum([...Gender] as [string, ...string[]]),
      dateOfBirth: z.string(),
      email: z.string().email('Invalid email format'),
      contactNo: z.string(),
      emergencyContactNo: z.string(),
      bloodGroup: z.enum([...BloodGroup] as [string, ...string[]]),
      presentAddress: z.string(),
      permanentAddress: z.string(),
      profileImg: z.string().optional(),
    }),
  }),
});
const updateAdminValidationSchema = z.object({
  body: z.object({
    admin: z.object({
      name: updateAdminNameSchema.optional(),
      gender: z.enum([...Gender] as [string, ...string[]]).optional(),
      dateOfBirth: z.string().optional(),
      email: z.string().email('Invalid email format').optional(),
      contactNo: z.string().optional(),
      emergencyContactNo: z.string().optional(),
      bloodGroup: z.enum([...BloodGroup] as [string, ...string[]]).optional(),
      presentAddress: z.string().optional().optional(),
      permanentAddress: z.string().optional(),
      profileImg: z.string().optional(),
    }),
  }),
});

export const adminValidations = {
  createAdminValidationSchema,
  updateAdminValidationSchema,
};
