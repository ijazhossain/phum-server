import { Router } from 'express';

import validateRequest from '../../app/middlewares/validateRequest';
import { adminValidations } from './admin.validation';
import { AdminControllers } from './admin.controller';
import { USER_ROLE } from '../user/user.constant';
import auth from '../../app/utils/auth';

const router = Router();
router.get(
  '/',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  AdminControllers.getAllAdmins,
);
router.get(
  '/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  AdminControllers.getSingleAdmin,
);
router.delete(
  '/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  AdminControllers.deleteSingleAdmin,
);
router.patch(
  '/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(adminValidations.updateAdminValidationSchema),
  AdminControllers.updateSingleAdmin,
);

export const AdminRoutes = router;
