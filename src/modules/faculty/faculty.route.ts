import { Router } from 'express';
import { FacultyControllers } from './faculty.controller';

const router = Router();
router.get('/', FacultyControllers.getAllFaculties);
router.get('/:facultyId', FacultyControllers.getSingleFaculty);
router.delete('/:facultyId', FacultyControllers.deleteSingleFaculty);

export const FacultyRoutes = router;
