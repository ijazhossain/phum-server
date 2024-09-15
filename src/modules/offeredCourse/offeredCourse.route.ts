import { Router } from 'express';
import { OfferedCourseControllers } from './offeredCourse.controller';

import { OfferedCourseValidations } from './offeredCourse.validation';
import validateRequest from '../../app/middlewares/validateRequest';
import auth from '../../app/utils/auth';
import { USER_ROLE } from '../user/user.constant';

const router = Router();
router.post(
  '/create-offered-course',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(OfferedCourseValidations.createOfferedCourseValidationSchema),
  OfferedCourseControllers.createOfferedCourse,
);
router.patch(
  '/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(OfferedCourseValidations.updateOfferedCourseValidationSchema),
  OfferedCourseControllers.updateOfferedCourse,
);
router.get('/', OfferedCourseControllers.getAllOfferedCourses);
router.get('/:id', OfferedCourseControllers.getSingleOfferedCourse);
router.delete('/:id', OfferedCourseControllers.deleteOfferedCourse);
export const OfferedCourseRoutes = router;
