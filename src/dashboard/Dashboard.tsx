import React from 'react';

import { ProjectData, UpdateProjectData } from './store/types';
import CurrentUser from './CurrentUser';
import { StoreProvider } from './store';
import Menubar from './Menubar';
import Project from './Project';
import { useDashboardStyles } from './styles';

export interface Props {
  projectsUrlPath: string,
  title: string,
  state: ProjectData,
  updateProjectData: UpdateProjectData,
}
export default function Dashboard({ state, title, updateProjectData, projectsUrlPath }: Props) {
  const classNames = useDashboardStyles();

  return (
    <StoreProvider state={state} updateProjectData={updateProjectData}>
      <CurrentUser userId={state.ids.user[0]}>
        <div className={classNames.root}>
          <Menubar projectsUrlPath={projectsUrlPath} title={title} />
          <div className={classNames.content}>
            <Project/>
          </div>
        </div>
      </CurrentUser>
    </StoreProvider>
  );
}
