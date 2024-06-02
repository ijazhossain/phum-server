import express from 'express';
import { StudentControllers } from './student.controller';
import validateRequest from '../../app/middlewares/validateRequest';
import { studentValidations } from './student.validation';

const router = express.Router();
router.get('/', StudentControllers.getAllStudents);
router.get('/:id', StudentControllers.getSingleStudent);
router.delete('/:id', StudentControllers.deleteStudent);
router.patch(
  '/:id',
  validateRequest(studentValidations.updateStudentValidationSchema),
  StudentControllers.updateStudent,
);
export const StudentRoutes = router;
