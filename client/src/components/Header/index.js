import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = ({ context: { currentUser } }) => (
  <header>
    <div className="wrap header--flex">
      <h1 className="header--logo">
        <NavLink to="/">Courses</NavLink>
      </h1>
      <nav>
        <ul className={`header--${currentUser ? 'signedin' : 'signedout'}`}>
          {currentUser ? (
            <li>{`Welcome, ${currentUser.firstName} ${currentUser.lastName}!`}</li>
          ) : (
            <li>
              <NavLink to="/sign-up">Sign Up</NavLink>
            </li>
          )}

          <li>
            <NavLink to={currentUser ? '/sign-out' : '/sign-in'}>
              {currentUser ? 'Sign Out' : 'Sign In'}
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  </header>
);

export default Header;
