import axios from 'axios';
import React, { useState } from 'react';

/* eslint-disable max-lines-per-function */
export default function Register(): JSX.Element {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordRepeat, setPasswordRepeat] = useState<string>('');

  const register = () => {
    if (password !== passwordRepeat) {
      console.log('Password and repeat do not match');
      return;
    }

    axios
      .post(
        'http://localhost:3001/api/login',
        { name, email, password },
        { withCredentials: true },
      )
      .then((res) => {
        if (res.status === 201) {
          window.location.href = '/login';
        }
      });
  };

  return (
    <div>
      <h1>Register</h1>
      <input
        type="text"
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="text"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="text"
        placeholder="Password again"
        onChange={(e) => setPasswordRepeat(e.target.value)}
      />
      <button onClick={register}>Register</button>
    </div>
  );
}
