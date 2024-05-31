import { Router } from 'express';
import { FacultyControllers } from './faculty.controller';
import validateRequest from '../../app/middlewares/validateRequest';
import { facultyValidations } from './faculty.validation';

const router = Router();
router.get('/', FacultyControllers.getAllFaculties);
router.get('/:facultyId', FacultyControllers.getSingleFaculty);
router.delete('/:facultyId', FacultyControllers.deleteSingleFaculty);
router.patch(
  '/:facultyId',
  validateRequest(facultyValidations.updateFacultyValidationSchema),
  FacultyControllers.updateSingleFaculty,
);

export const FacultyRoutes = router;
