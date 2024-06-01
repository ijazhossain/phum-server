import { UserControllers } from './user.controller';

import { studentValidations } from '../student/student.validation';
import { Router } from 'express';
import validateRequest from '../../app/middlewares/validateRequest';
import { facultyValidations } from '../faculty/faculty.validation';
import { adminValidations } from '../admin/admin.validation';

const router = Router();

router.post(
  '/create-student',
  validateRequest(studentValidations.createStudentValidationSchema),
  UserControllers.createStudent,
);
router.post(
  '/create-faculty',
  validateRequest(facultyValidations.createFacultyValidationSchema),
  UserControllers.createFaculty,
);
router.post(
  '/create-admin',
  validateRequest(adminValidations.createAdminValidationSchema),
  UserControllers.createAdmin,
);

export const UserRoutes = router;
