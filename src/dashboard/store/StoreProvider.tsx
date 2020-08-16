import React, { ReactNode } from 'react';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from 'react-redux';

import { ProjectData } from './types';
import { reducer, emptyProjectData } from './base';

export interface StoreProviderProps {
  children: ReactNode,
  projectId: string,
  state?: ProjectData,
}

export function StoreProvider({
  children,
  projectId,
  state = emptyProjectData,
}: StoreProviderProps) {

  // @ts-ignore
  const store = createStore(
    reducer,
    state,
    composeWithDevTools(applyMiddleware())
  );

  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
}
