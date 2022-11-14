import withContext from './Context';
import Header from './Header';
import UserSignUp from './UserSignUp';
import UserSignIn from './UserSignIn';
import UserSignOut from './UserSignOut';
import Courses from './Courses';
import CourseDetail from './CourseDetail';
import CreateCourse from './CreateCourse';
import UpdateCourse from './UpdateCourse';

export const HeaderWithContext = withContext(Header);
export const UserSignUpWithContext = withContext(UserSignUp);
export const UserSignInWithContext = withContext(UserSignIn);
export const UserSignOutWithContext = withContext(UserSignOut);
export const CoursesWithContext = withContext(Courses);
export const CourseDetailWithContext = withContext(CourseDetail);
export const CreateCourseWithContext = withContext(CreateCourse);
export const UpdateCourseWithContext = withContext(UpdateCourse);

export { default as PrivateRoute } from './PrivateRoute';
export { default as NotFound } from './NotFound';
export { default as Forbidden } from './Forbidden';
export { default as UnhandledError } from './UnhandledError';
