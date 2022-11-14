import { Routes, Route } from 'react-router-dom';
import routes from './routes';

import { PrivateRoute, withContext, Header, CreateCourse, UpdateCourse } from './components';

const HeaderWithContext = withContext(Header);
const CreateCourseWithContext = withContext(CreateCourse);
const UpdateCourseWithContext = withContext(UpdateCourse);

const App = () => {
  return (
    <>
      <HeaderWithContext />

      <Routes>
        {routes.map(({ path, element }, index) => (
          <Route path={path} element={element} key={index} />
        ))}

        <Route>
          <Route element={<PrivateRoute />}>
            <Route path="/courses/create" element={<CreateCourseWithContext />} />
            <Route path="/courses/:id/update" element={<UpdateCourseWithContext />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
};

export default App;
