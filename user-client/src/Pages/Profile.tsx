import axios from 'axios';
import React, { useContext } from 'react';
import { userContext } from '../Context/UserContext';

export default function Profile(): JSX.Element {
  const ctx = useContext(userContext);

  // eslint-disable-next-line
  const deleteUser = () => {
    if (ctx) {
      axios.post('http://localhost:3001/api/user', {
        id: ctx?.user?.id,
      });
    }
  };

  return (
    <div>
      <p>Profile Page</p>
    </div>
  );
}
