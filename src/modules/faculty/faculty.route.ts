import { Router } from 'express';
import { FacultyControllers } from './faculty.controller';

const router = Router();
router.get('/', FacultyControllers.getAllFaculties);
router.get('/:facultyId', FacultyControllers.getSingleFaculty);

export const FacultyRoutes = router;
