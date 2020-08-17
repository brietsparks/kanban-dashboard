import React, { useCallback } from 'react';
import { useAsync } from 'react-async-hook';

import { emptyProjectData } from './store';
import { Project as ProjectState, ProjectData, UpdateProjectData } from './store/types';
import CurrentUser from './CurrentUser';
import { useServiceClient } from '../service';
import { StoreProvider } from './store';
import Menubar from './Menubar';
import Project from './Project';
import { useDashboardStyles } from './styles';

export interface Props {
  projectId: string,
  projectsUrlPath: string,
}
export default function Dashboard({ projectId, projectsUrlPath }: Props) {
  const service = useServiceClient();
  const { error, loading, result } = useAsync<ProjectState>(service.getProject.bind(service), [projectId]);
  const classNames = useDashboardStyles();

  const updateProjectData = useCallback((projectData: ProjectData) => {
    return service.updateProjectData(projectId, projectData);
  }, [service, projectId])

  if (loading) {
    return <p>loading project</p>
  }

  if (error) {
    return <p>error loading project</p>
  }

  if (!result) {
    return <p>error getting data</p>
  }

  const state = result.data || emptyProjectData;

  return (
    <StoreProvider state={state} updateProjectData={updateProjectData}>
      <CurrentUser userId={state.ids.user[0]}>
        <div className={classNames.root}>
          <Menubar projectsUrlPath={projectsUrlPath} title={result.meta.title} />
          <div className={classNames.content}>
            <Project/>
          </div>
        </div>
      </CurrentUser>
    </StoreProvider>
  );
}
