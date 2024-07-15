import { Router } from 'express';
import { UserRoutes } from '../../modules/user/user.route';
import { StudentRoutes } from '../../modules/student/student.route';
import { AcademicSemesterRoutes } from '../../modules/academicSemester/academicSemester.route';
import { AcademicFacultyRouters } from '../../modules/academicFaculty/academicFaculty.route';
import { AcademicDepartmentRoutes } from '../../modules/academicDepartment/academicDepartment.route';
import { FacultyRoutes } from '../../modules/faculty/faculty.route';
import { AdminRoutes } from '../../modules/admin/admin.route';
import { CourseRoutes } from '../../modules/courses/course.route';
import { SemesterRegistrationRoutes } from '../../modules/semesterRegistration/semesterRegistration.route';
import { OfferedCourseRoutes } from '../../modules/offeredCourse/offeredCourse.route';
import { AuthRoutes } from '../../modules/Auth/auth.route';
import { EnrolledCourseRoutes } from '../../modules/EnrolledCourses/enrolledCourse.route';

const router = Router();
const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/students',
    route: StudentRoutes,
  },
  {
    path: '/academic-semesters',
    route: AcademicSemesterRoutes,
  },
  {
    path: '/academic-faculties',
    route: AcademicFacultyRouters,
  },
  {
    path: '/academic-departments',
    route: AcademicDepartmentRoutes,
  },
  {
    path: '/faculties',
    route: FacultyRoutes,
  },
  {
    path: '/admins',
    route: AdminRoutes,
  },
  {
    path: '/courses',
    route: CourseRoutes,
  },
  {
    path: '/semester-registration',
    route: SemesterRegistrationRoutes,
  },
  {
    path: '/offered-courses',
    route: OfferedCourseRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/enrolled-courses',
    route: EnrolledCourseRoutes,
  },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
/* router.use('/users', UserRoutes);
router.use('/students', StudentRoutes); */
export default router;
