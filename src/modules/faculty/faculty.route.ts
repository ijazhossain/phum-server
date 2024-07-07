import { Router } from 'express';
import { FacultyControllers } from './faculty.controller';
import validateRequest from '../../app/middlewares/validateRequest';
import { facultyValidations } from './faculty.validation';
import auth from '../../app/utils/auth';
import { USER_ROLE } from '../user/user.constant';

const router = Router();
router.get('/', auth(USER_ROLE.admin), FacultyControllers.getAllFaculties);
router.get('/:id', FacultyControllers.getSingleFaculty);
router.delete('/:id', FacultyControllers.deleteSingleFaculty);
router.patch(
  '/:id',
  validateRequest(facultyValidations.updateFacultyValidationSchema),
  FacultyControllers.updateSingleFaculty,
);

export const FacultyRoutes = router;
