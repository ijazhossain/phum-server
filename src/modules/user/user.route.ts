import { UserControllers } from './user.controller';

import { studentValidations } from '../student/student.validation';
import { Router } from 'express';
import validateRequest from '../../app/middlewares/validateRequest';

const router = Router();

router.post(
  '/create-student',
  validateRequest(studentValidations.createStudentValidationSchema),
  UserControllers.createStudent,
);

export const UserRoutes = router;
