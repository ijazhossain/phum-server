import { Router } from 'express';

import validateRequest from '../../app/middlewares/validateRequest';
import { adminValidations } from './admin.validation';
import { AdminControllers } from './admin.controller';

const router = Router();
router.get('/', AdminControllers.getAllAdmins);
router.get('/:adminId', AdminControllers.getSingleAdmin);
router.delete('/:adminId', AdminControllers.deleteSingleAdmin);
router.patch(
  '/:adminId',
  validateRequest(adminValidations.updateAdminValidationSchema),
  AdminControllers.updateSingleAdmin,
);

export const AdminRoutes = router;
