import {
  UserSignUpWithContext,
  UserSignInWithContext,
  UserSignOutWithContext,
  CoursesWithContext,
  CourseDetailWithContext,
  NotFound,
  Forbidden,
  UnhandledError
} from './components';

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
