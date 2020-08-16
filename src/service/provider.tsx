import React, { ReactNode, createContext, useContext } from 'react';

import { LocalStorageServiceClient } from './client';

export interface ContextValue {
  client?: LocalStorageServiceClient,
  isClientAuthenticated?: boolean,
}
const ServiceContext = createContext<ContextValue>({});

export interface Props {
  children: ReactNode
}

const client = new LocalStorageServiceClient();

export function ServiceProvider({ children }: Props) {
  const value: ContextValue = { client };

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
