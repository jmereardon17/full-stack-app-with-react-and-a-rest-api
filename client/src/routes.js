import {
  withContext,
  Courses,
  CourseDetail,
  UserSignIn,
  UserSignUp,
  UserSignOut,
  NotFound,
  Forbidden,
  UnhandledError
} from './components';

const UserSignUpWithContext = withContext(UserSignUp);
const UserSignInWithContext = withContext(UserSignIn);
const UserSignOutWithContext = withContext(UserSignOut);
const CoursesWithContext = withContext(Courses);
const CourseDetailWithContext = withContext(CourseDetail);

const routes = [
  {
    path: '/',
    element: <CoursesWithContext />
  },
  {
    path: '/courses/:id',
    element: <CourseDetailWithContext />
  },
  {
    path: '/sign-in',
    element: <UserSignInWithContext />
  },
  {
    path: '/sign-up',
    element: <UserSignUpWithContext />
  },
  {
    path: '/sign-out',
    element: <UserSignOutWithContext />
  },
  {
    path: '/forbidden',
    element: <Forbidden />
  },
  {
    path: '/error',
    element: <UnhandledError />
  },
  {
    path: '/notfound',
    element: <NotFound />
  },
  {
    path: '*',
    element: <NotFound />
  }
];

export default routes;
