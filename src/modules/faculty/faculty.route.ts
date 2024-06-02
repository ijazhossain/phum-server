import { Router } from 'express';
import { FacultyControllers } from './faculty.controller';
import validateRequest from '../../app/middlewares/validateRequest';
import { facultyValidations } from './faculty.validation';

const router = Router();
router.get('/', FacultyControllers.getAllFaculties);
router.get('/:id', FacultyControllers.getSingleFaculty);
router.delete('/:id', FacultyControllers.deleteSingleFaculty);
router.patch(
  '/:id',
  validateRequest(facultyValidations.updateFacultyValidationSchema),
  FacultyControllers.updateSingleFaculty,
);

export const FacultyRoutes = router;
