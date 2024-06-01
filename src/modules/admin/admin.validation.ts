import { z } from 'zod';
import { BloodGroup, Gender } from './admin.constant';

// Define the Zod schema for the admin name
const adminNameSchema = z.object({
  firstName: z.string(),
  middleName: z.string().optional(),
  lastName: z.string(),
});

// Define the Zod schema for the admin
const createAdminValidationSchema = z.object({
  body: z.object({
    admin: z.object({
      id: z.string(),
      user: z.string(),
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
      id: z.string().optional(),
      user: z.string().optional(),
      name: adminNameSchema,
      gender: z.enum([...Gender] as [string, ...string[]]),
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
