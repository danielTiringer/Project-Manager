import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { userContext } from '../Context/UserContext';

export default function NavBar(): JSX.Element {
  const ctx = useContext(userContext);

  return (
    <div className="NavContainer">
      {ctx ? (
        <>
          <Link to="/logout">Logout</Link>
          <Link to="/profile">Profile</Link>
        </>
      ) : (
        <>
          <Link to="/register">Register</Link>
          <Link to="/login">Login</Link>
        </>
      )}
      <Link to="/">Home</Link>
    </div>
  );
}
