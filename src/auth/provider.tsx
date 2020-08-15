import React, { ReactNode, createContext, useContext, useState } from 'react';

export interface AuthState {
  isInitialized?: boolean,
  isUserAuthenticated?: boolean,
  id?: string,
  token?: string,
  isLoading?: boolean,
}

export const AuthContext = createContext<AuthState>({});

export interface Props {
  children?: ReactNode
}
export function AuthProvider({ children }: Props) {
  const [userId, isLoading, error] = ['u1', false, undefined]; // todo
  const [isInitialized, setIsInitialized] = useState(false);
  const [token, setToken] = useState<string|undefined>(undefined);

  const value: AuthState = {
    isInitialized,
    isUserAuthenticated: !!userId,
    id: userId,
    token,
    isLoading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
