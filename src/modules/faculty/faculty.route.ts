import { Router } from 'express';
import { FacultyControllers } from './faculty.controller';
import validateRequest from '../../app/middlewares/validateRequest';
import { facultyValidations } from './faculty.validation';
import auth from '../../app/utils/auth';
import { USER_ROLE } from '../user/user.constant';

const router = Router();
router.get(
  '/',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  FacultyControllers.getAllFaculties,
);
router.get(
  '/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  FacultyControllers.getSingleFaculty,
);
router.delete(
  '/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  FacultyControllers.deleteSingleFaculty,
);
router.patch(
  '/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(facultyValidations.updateFacultyValidationSchema),
  FacultyControllers.updateSingleFaculty,
);

export const FacultyRoutes = router;
