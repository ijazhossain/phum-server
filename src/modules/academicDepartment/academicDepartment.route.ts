import { Router } from 'express';
import { AcademicDepartmentControllers } from './academicDepartment.controller';
import validateRequest from '../../app/middlewares/validateRequest';
import { AcademicDepartmentValidation } from './academicDepartment.validation';
import auth from '../../app/utils/auth';
import { USER_ROLE } from '../user/user.constant';

const router = Router();
router.post(
  '/create-academic-department',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(
    AcademicDepartmentValidation.createAcademicDepartmentValidationSchema,
  ),
  AcademicDepartmentControllers.createAcademicDepartment,
);
router.get('/', AcademicDepartmentControllers.getAllAcademicDepartment);
router.get(
  '/:departmentId',
  AcademicDepartmentControllers.getSingleAcademicDepartment,
);
router.patch(
  '/:departmentId',
  validateRequest(
    AcademicDepartmentValidation.updateAcademicDepartmentValidationSchema,
  ),
  AcademicDepartmentControllers.updateAcademicDepartment,
);
router.delete(
  '/:departmentId',
  AcademicDepartmentControllers.deleteAcademicDepartment,
);
export const AcademicDepartmentRoutes = router;
