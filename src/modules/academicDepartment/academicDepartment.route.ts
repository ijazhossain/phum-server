import { Router } from 'express';
import { AcademicDepartmentControllers } from './academicDepartment.controller';
import validateRequest from '../../app/middlewares/validateRequest';
import { AcademicDepartmentValidation } from './academicDepartment.validation';

const router = Router();
router.post(
  '/create-academic-department',
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
