import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const Courses = ({ context }) => {
  const [courses, setCourses] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    let getCourses = true;

    context.data
      .getCourses()
      .then(getCourses && setCourses)
      .catch(err => {
        console.error('Error getting courses - ', err);
        navigate('/error');
      });

    return () => (getCourses = true);
  }, [context.data, navigate]);

  return (
    <main>
      <ul className="wrap main--grid">
        {courses?.map(course => (
          <li key={course.id}>
            <NavLink className="course--module course--link" to={`/courses/${course.id}`}>
              <h2 className="course--label">Course</h2>
              <h3 className="course--title">{course.title}</h3>
            </NavLink>
          </li>
        ))}
        <li>
          <NavLink className="course--module course--add--module" to="/courses/create">
            <span className="course--add--title">
              <svg
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                viewBox="0 0 13 13"
                className="add"
              >
                <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
              </svg>
              New Course
            </span>
          </NavLink>
        </li>
      </ul>
    </main>
  );
};

export default Courses;
