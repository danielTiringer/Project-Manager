import axios from 'axios';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { userContext } from '../Context/UserContext';

export default function NavBar(): JSX.Element {
  const ctx = useContext(userContext);

  const logout = () => {
    axios
      .get('http://localhost:3001/api/logout', {
        withCredentials: true,
      })
      .then((res) => {
        if (res.status === 200) {
          window.location.href = '/';
        }
      });
  };

  return (
    <div className="NavContainer">
      {ctx ? (
        <>
          <Link to="/logout" onClick={logout}>
            Logout
          </Link>
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
