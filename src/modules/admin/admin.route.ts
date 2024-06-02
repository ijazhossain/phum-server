import { Router } from 'express';

import validateRequest from '../../app/middlewares/validateRequest';
import { adminValidations } from './admin.validation';
import { AdminControllers } from './admin.controller';

const router = Router();
router.get('/', AdminControllers.getAllAdmins);
router.get('/:id', AdminControllers.getSingleAdmin);
router.delete('/:id', AdminControllers.deleteSingleAdmin);
router.patch(
  '/:id',
  validateRequest(adminValidations.updateAdminValidationSchema),
  AdminControllers.updateSingleAdmin,
);

export const AdminRoutes = router;
