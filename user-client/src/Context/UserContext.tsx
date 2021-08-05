import React, { createContext, PropsWithChildren } from 'react';

export const userContext = createContext<any>({});

export default function UserContext(
  props: PropsWithChildren<any>,
): JSX.Element {
  return (
    <userContext.Provider value={1000}>{props.children}</userContext.Provider>
  );
}
