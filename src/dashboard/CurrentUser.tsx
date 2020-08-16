import React, { ReactNode, createContext, useContext, useState, useEffect } from 'react';
import { hooks } from './store';
import { v4 as uuid } from 'uuid';

export interface CurrentUserContextValue {
  userId: string,
  setUserId: (userId: string) => void
}

const CurrentUserContext = createContext<CurrentUserContextValue>(null);

export interface Props {
  children: ReactNode,
  userId: string
}
export default function CurrentUserProvider({ children, userId: initialUserId }: Props) {
  const [userId, setUserId] = useState(initialUserId);

  // initialize a default user if given an empty userId
  const createUser = hooks.useCreateUser();
  useEffect(() => {
    if (!userId) {
      const id = uuid();
      createUser({ id, username: 'Default User' });
      setUserId(id)
    }
  }, [userId, setUserId, createUser])


  const value = { userId, setUserId };
  return (
    <CurrentUserContext.Provider value={value}>
      {children}
    </CurrentUserContext.Provider>
  );
}

export function useCurrentUserId() {
  const context = useContext(CurrentUserContext);
  return context.userId;
}

export function useSetCurrentUserId() {
  const context = useContext(CurrentUserContext);
  return context.setUserId;
}

export function useCurrentUsername() {
  const userId = useCurrentUserId();
  const user = hooks.useUser(userId);
  if (!user) {
    return '';
  }

  return user.username;
}
