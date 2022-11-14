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
    const prevLocation = location.state?.from || '/';

    context.actions
      .signIn(emailAddress, password)
      .then(user =>
        user ? navigate(prevLocation, { replace: true }) : setErrors(['Sign-in was unsuccessful'])
      )
      .catch(err => {
        console.error('Error occurred signing in: ', err);
        navigate('/error');
      });
  };

  return (
    <main>
      <div className="form--centered">
        <h2>Sign In</h2>

        {errors && (
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
