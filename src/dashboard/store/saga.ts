import { spawn, takeEvery, call, select } from 'redux-saga/effects';
import { CreateAction } from 'normalized-reducer';

import { actionTypes } from './base';
import { UpdateProjectData } from './types';

export function makeSaga(updateProjectData: UpdateProjectData) {
  function* rootSaga() {
    yield spawn(watchModelActions);
  }

  function* watchModelActions() {
    for (let actionType of Object.values(actionTypes)) {
      yield takeEvery(actionType, handleModelAction);
    }
  }

  function* handleModelAction() {
    const projectData = yield select();
    yield call(updateProjectData, projectData)
  }

  return rootSaga;
}
