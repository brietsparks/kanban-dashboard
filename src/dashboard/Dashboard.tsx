import React, { useState } from 'react';
import { useAsync } from 'react-async-hook';
import { emptyProjectData } from './store';
import { Project as ProjectState } from './store/types';

import CurrentUser from './CurrentUser';
import { useServiceClient } from '../service';
import { StoreProvider } from './store';
import Menubar from './Menubar';
import Project from './Project';
import { useDashboardStyles } from './styles';

export interface Props {
  projectId?: string
}
export default function Dashboard({ projectId }: Props) {
  const service = useServiceClient();
  const { error, loading, result } = useAsync<ProjectState>(service.getProject.bind(service), [projectId]);
  const classNames = useDashboardStyles();

  if (loading) {
    return <p>loading project</p>
  }

  if (error) {
    return <p>error loading project</p>
  }

  const state = result.data || emptyProjectData;

  return (
    <StoreProvider projectId={projectId} state={state}>
      <CurrentUser userId={state.ids.user[0]}>
        <div className={classNames.root}>
          <Menubar/>
          <div className={classNames.content}>
            <Project/>
          </div>
        </div>
      </CurrentUser>
    </StoreProvider>
  );
}
