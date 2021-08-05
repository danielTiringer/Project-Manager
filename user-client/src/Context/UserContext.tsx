import React, {
  createContext,
  PropsWithChildren,
  useEffect,
  useState,
} from 'react';
import axios from 'axios';
import { UserType } from '../Types/UserType';

export const userContext = createContext<UserType | undefined>({});

export default function UserContext(
  props: PropsWithChildren<any>,
): JSX.Element {
  const [user, setUser] = useState<UserType | undefined>();

  useEffect(() => {
    axios
      .get('http://localhost:3001/api/user', {
        withCredentials: true,
      })
      .then((res) => {
        setUser(res.data);
      });
  }, []);

  return (
    <userContext.Provider value={user}>{props.children}</userContext.Provider>
  );
}
