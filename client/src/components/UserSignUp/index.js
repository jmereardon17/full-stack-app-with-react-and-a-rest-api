import React, { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';

const UserSignUp = ({ context }) => {
  const [errors, setErrors] = useState();
  const navigate = useNavigate();

  const handleSubmit = e => {
    e.preventDefault();

    const user = {
      firstName: document.getElementById('firstName').value,
      lastName: document.getElementById('lastName').value,
      emailAddress: document.getElementById('emailAddress').value,
      password: document.getElementById('password').value
    };

    context.data
      .createUser(user)
      .then(errors => {
        if (errors) {
          setErrors(errors);
        } else {
          context.actions
            .signIn(user.emailAddress, user.password)
            .then(user => (user ? navigate('/') : setErrors(['Sign-in was unsuccessful'])))
            .catch(err => {
              console.error('Error occurred signing in: ', err);
              navigate('/error');
            });
          navigate('/');
        }
      })
      .catch(err => {
        console.error('Error creating user: ', err);
        navigate('/error');
      });
  };

  return (
    <div className="form--centered">
      <h2>Sign Up</h2>

      {errors && (
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
        <label htmlFor="firstName">First Name</label>
        <input id="firstName" name="firstName" type="text" />
        <label htmlFor="lastName">Last Name</label>
        <input id="lastName" name="lastName" type="text" />
        <label htmlFor="emailAddress">Email Address</label>
        <input id="emailAddress" name="emailAddress" type="email" />
        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" />
        <button className="button" type="submit">
          Sign Up
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
        Already have a user account? Click here to <NavLink to="/sign-in">sign in</NavLink>!
      </p>
    </div>
  );
};

export default UserSignUp;
