import { ProjectData } from './types';
import * as actions from './actions';
import * as selectors from './selectors';
import * as hooks from './hooks';

export type State = ProjectData;
export { actions, selectors, hooks };
export { emptyProjectData } from './base';
export * from './StoreProvider';

export const emptyArray = [];
