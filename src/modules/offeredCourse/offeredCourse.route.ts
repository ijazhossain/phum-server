import { Router } from 'express';
import { OfferedCourseControllers } from './offeredCourse.controller';

import { OfferedCourseValidations } from './offeredCourse.validation';
import validateRequest from '../../app/middlewares/validateRequest';

const router = Router();
router.post(
  '/create-offered-course',
  validateRequest(OfferedCourseValidations.createOfferedCourseValidationSchema),
  OfferedCourseControllers.createOfferedCourse,
);
router.patch(
  '/:id',
  validateRequest(OfferedCourseValidations.updateOfferedCourseValidationSchema),
  OfferedCourseControllers.updateOfferedCourse,
);
router.get('/', OfferedCourseControllers.getAllOfferedCourses);
router.get('/:id', OfferedCourseControllers.getSingleOfferedCourse);
router.delete('/:id', OfferedCourseControllers.deleteOfferedCourse);
export const OfferedCourseRoutes = router;
