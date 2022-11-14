import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateCourse = ({ context }) => {
  const [errors, setErrors] = useState();
  const { data, currentUser } = context;
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();

    const course = {
      title: document.getElementById('courseTitle').value,
      description: document.getElementById('courseDescription').value,
      estimatedTime: document.getElementById('estimatedTime').value,
      materialsNeeded: document.getElementById('materialsNeeded').value,
      userId: currentUser.id
    };

    await data
      .createCourse(course, currentUser)
      .then(errors => (errors ? setErrors(errors) : navigate('/'))) // if errors set state otherwise navigate to root
      .catch(err => {
        console.error('Error creating course: ', err);
        navigate('/error');
      });
  };

  return (
    <main>
      <div className="wrap">
        <h2>Create Course</h2>

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
              <input id="courseTitle" name="courseTitle" type="text" />

              <p>
                By {currentUser.firstName} {currentUser.lastName}
              </p>

              <label htmlFor="courseDescription">Course Description</label>
              <textarea id="courseDescription" name="courseDescription"></textarea>
            </div>
            <div>
              <label htmlFor="estimatedTime">Estimated Time</label>
              <input id="estimatedTime" name="estimatedTime" type="text" />

              <label htmlFor="materialsNeeded">Materials Needed</label>
              <textarea id="materialsNeeded" name="materialsNeeded"></textarea>
            </div>
          </div>
          <button className="button" type="submit">
            Create Course
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
};

export default CreateCourse;
