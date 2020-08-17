import React, { ReactNode } from 'react';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';

import { ProjectData, UpdateProjectData } from './types';
import { reducer, emptyProjectData } from './base';
import { makeSaga } from './saga';

export interface StoreProviderProps {
  children: ReactNode,
  updateProjectData: UpdateProjectData,
  state?: ProjectData,
}

export function StoreProvider({
  children,
  updateProjectData,
  state = emptyProjectData,
}: StoreProviderProps) {
  const sagaMiddleware = createSagaMiddleware();

  // @ts-ignore
  const store = createStore(
    reducer,
    state,
    composeWithDevTools(applyMiddleware(sagaMiddleware))
  );

  sagaMiddleware.run(makeSaga(updateProjectData));

  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
}
