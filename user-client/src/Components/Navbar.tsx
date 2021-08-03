import React from 'react';
import { Link } from 'react-router-dom';

export default function NavBar(): JSX.Element {
  return (
    <div className="NavContainer">
      <Link to="/logout">Logout</Link>
      <Link to="/home">Home</Link>
      <Link to="/profile">Profile</Link>
      <Link to="/admin">Admin</Link>
    </div>
  );
}
