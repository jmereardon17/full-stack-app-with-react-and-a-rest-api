import React, { useState, useEffect } from 'react';
import { useParams, NavLink, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

const CourseDetail = ({ context }) => {
  const [course, setCourse] = useState();
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = context;

  const handleDelete = () => {
    context.data
      .deleteCourse(course.id, currentUser)
      .then(res => {
        if (res.ok) navigate('/'); // if successfull redirect to root
        if (res.status === 403) navigate('/forbidden'); // redirect to forbidden since this is the only other outcome
      })
      .catch(err => {
        console.error(`Error deleting course with id: ${id} - `, err);
        navigate('/error');
      });
  };

  useEffect(() => {
    context.data
      .getCourse(id)
      .then(course => (course ? setCourse(course) : navigate('/notfound'))) // if course exists set state otherwise redirect to 404
      .catch(err => {
        console.error(`Error getting course with id: ${id} - `, err);
        navigate('/error');
      });
  }, [id, context.data, navigate]);

  if (course) {
    return (
      <main>
        <div className="actions--bar">
          <div className="wrap">
            {currentUser?.id === course.userId && (
              <>
                <NavLink className="button" to={`/courses/${course.id}/update`}>
                  Update Course
                </NavLink>
                <button className="button" onClick={handleDelete}>
                  Delete Course
                </button>
              </>
            )}

            <NavLink className="button" to="/">
              Return to List
            </NavLink>
          </div>
        </div>

        <div className="wrap">
          <h2>Course Detail</h2>
          <form>
            <div className="main--flex">
              <div>
                <h3 className="course--detail--title">Course</h3>
                <h4 className="course--name">{course.title}</h4>
                <p>{`By ${course.user.firstName} ${course.user.lastName}`}</p>
                <ReactMarkdown>{course.description}</ReactMarkdown>
              </div>

              <div>
                {course.estimatedTime && (
                  <>
                    <h3 className="course--detail--title">Estimated Time</h3>
                    <p>{course.estimatedTime}</p>
                  </>
                )}

                {course.materialsNeeded && (
                  <>
                    <h3 className="course--detail--title">Materials Needed</h3>
                    <ReactMarkdown className="course--detail--list">
                      {course.materialsNeeded}
                    </ReactMarkdown>
                  </>
                )}
              </div>
            </div>
          </form>
        </div>
      </main>
    );
  }

  return;
};

export default CourseDetail;
