import axios from 'axios';
import React, { useState } from 'react';

export default function Login(): JSX.Element {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const login = () => {
    axios
      .post(
        'http://localhost:3001/api/login',
        { email, password },
        { withCredentials: true },
      )
      .then((res) => {
        if (res.status === 201) {
          window.location.href = '/';
        }
      });
  };

  return (
    <div>
      <h1>Login</h1>
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
      <button onClick={login}>Login</button>
    </div>
  );
}
