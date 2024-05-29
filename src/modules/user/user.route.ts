import { UserControllers } from './user.controller';

import { studentValidations } from '../student/student.validation';
import { Router } from 'express';
import validateRequest from '../../app/middlewares/validateRequest';
import { facultyValidations } from '../faculty/faculty.validation';

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

export const UserRoutes = router;
