import React, { useState } from 'react';
import { useNavigate, useLocation, NavLink } from 'react-router-dom';

const UserSignIn = ({ context }) => {
  const [errors, setErrors] = useState();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = e => {
    e.preventDefault();

    const emailAddress = document.getElementById('emailAddress').value;
    const password = document.getElementById('password').value;
    const prevLocation = location.state?.from || '/'; // get the previous location if exists or root

    if (emailAddress && password) {
      context.actions
        .signIn(emailAddress, password)
        .then(user =>
          user // user object returned from response
            ? navigate(prevLocation, { replace: true })
            : setErrors(['Email address and or password is incorrect'])
        )
        .catch(err => {
          console.error('Error occurred signing in: ', err);
          navigate('/error');
        });
    } else {
      setErrors(['Please enter an email address and password']); // set validation error for empty form values
    }
  };

  return (
    <main>
      <div className="form--centered">
        <h2>Sign In</h2>

        {errors && ( // if validation errors render
          <div className="validation--errors">
            <ul>
              {errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <label htmlFor="emailAddress">Email Address</label>
          <input id="emailAddress" name="emailAddress" type="email" />
          <label htmlFor="password">Password</label>
          <input id="password" name="password" type="password" />
          <button className="button" type="submit">
            Sign In
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

        <p>
          Don't have a user account? Click here to <NavLink to="/sign-up">sign up</NavLink>!
        </p>
      </div>
    </main>
  );
};

export default UserSignIn;
