import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateCourse = ({ context }) => {
  const [course, setCourse] = useState();
  const [errors, setErrors] = useState();
  const navigate = useNavigate();
  const { id } = useParams();
  const { currentUser } = context;

  useEffect(() => {
    context.data
      .getCourse(id)
      .then(course => {
        if (!course) return navigate('/notfound');
        // if course doesn't belong to the user
        course.userId !== currentUser?.id ? navigate('/forbidden') : setCourse(course);
      })
      .catch(err => {
        console.error(`Error getting course with id: ${id} - `, err);
        navigate('/error');
      });
  }, [id, context.data, currentUser.id, navigate]);

  const handleSubmit = e => {
    e.preventDefault();

    const course = {
      id,
      title: document.getElementById('courseTitle').value,
      description: document.getElementById('courseDescription').value,
      estimatedTime: document.getElementById('estimatedTime').value,
      materialsNeeded: document.getElementById('materialsNeeded').value,
      userId: currentUser.id
    };

    context.data
      .updateCourse(course, currentUser)
      .then(res => {
        if (res.ok) navigate('/');
        if (res.status === 400) return res.json();
        if (res.status === 403) navigate('/forbidden');
      })
      .then(setErrors) // set errors from response in state
      .catch(err => {
        console.error(`Error updating course with id: ${id} - `, err);
        navigate('/error');
      });
  };

  if (course) {
    return (
      <main>
        <div className="wrap">
          <h2>Update Course</h2>

          {errors && ( // if validation errors render
            <div className="validation--errors">
              <h3>Validation Errors</h3>
              <ul>
                {errors.map(error => (
                  <li key={error}>{error}</li>
                ))}
              </ul>
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="main--flex">
              <div>
                <label htmlFor="courseTitle">Course Title</label>
                <input
                  id="courseTitle"
                  name="courseTitle"
                  type="text"
                  defaultValue={course.title}
                />

                <p>
                  By {course.user.firstName} {course.user.lastName}
                </p>

                <label htmlFor="courseDescription">Course Description</label>
                <textarea
                  id="courseDescription"
                  name="courseDescription"
                  defaultValue={course.description}
                />
              </div>
              <div>
                <label htmlFor="estimatedTime">Estimated Time</label>
                <input
                  id="estimatedTime"
                  name="estimatedTime"
                  type="text"
                  defaultValue={course.estimatedTime}
                />

                <label htmlFor="materialsNeeded">Materials Needed</label>
                <textarea
                  id="materialsNeeded"
                  name="materialsNeeded"
                  defaultValue={course.materialsNeeded}
                />
              </div>
            </div>
            <button className="button" type="submit">
              Update Course
            </button>
            <button
              className="button button-secondary"
              onClick={e => {
                e.preventDefault();
                navigate('/');
              }}
            >
              Cancel
            </button>
          </form>
        </div>
      </main>
    );
  }

  return;
};

export default UpdateCourse;
