import React, { ReactNode, createContext, useContext, useState } from 'react';

import { useAuth } from '../auth';
import { ServiceClient } from './client';

export interface ContextValue {
  client?: ServiceClient,
  isClientAuthenticated?: boolean,
}
const ServiceContext = createContext<ContextValue>({});

export interface Props {
  children: ReactNode
}

const client = new ServiceClient();

export function ServiceProvider({ children }: Props) {
  const [isClientAuthenticated, setIsClientAuthenticated] = useState(false);

  const { token } = useAuth();

  client.setToken(token);
  if (token && !!token !== isClientAuthenticated) {
    setIsClientAuthenticated(!!token);
  }

  const value: ContextValue = { client, isClientAuthenticated };

  return (
    <ServiceContext.Provider value={value}>
      {children}
    </ServiceContext.Provider>
  );
}

export const useServiceContext = () => {
  return useContext(ServiceContext);
};

export const useServiceClient = () => {
  const { client } = useContext(ServiceContext);
  if (!client) {
    throw new Error('ServiceContext client is undefined, check that useServiceClient is being called inside the ServiceProvider context')
  }
  return client;
};
