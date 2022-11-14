import { Routes, Route } from 'react-router-dom';
import routes from './routes';

import {
  HeaderWithContext,
  PrivateRoute,
  CreateCourseWithContext,
  UpdateCourseWithContext
} from './components';

const App = () => {
  return (
    <>
      <HeaderWithContext />

      <Routes>
        {routes.map(({ path, element }, index) => (
          <Route path={path} element={element} key={index} />
        ))}

        <Route element={<PrivateRoute />}>
          <Route path="/courses/create" element={<CreateCourseWithContext />} />
          <Route path="/courses/:id/update" element={<UpdateCourseWithContext />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
