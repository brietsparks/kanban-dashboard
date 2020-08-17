import React, { useCallback } from 'react';
import { useAsync } from 'react-async-hook';
import { useRouter } from 'next/router';

import { useServiceClient } from '../service';
import { Dashboard } from '../dashboard';
import { Project as ProjectState, ProjectData } from '../dashboard/store/types';
import { ErrorPage } from '../components/error-page';

const errMsg = "The project failed to load or does not exist";

export default function DashboardPage() {
  const router = useRouter();
  const projectId = router.query.projectId as string;

  const service = useServiceClient();
  const { error, loading, result } = useAsync<ProjectState>(service.getProject.bind(service), [projectId]);

  const updateProjectData = useCallback((projectData: ProjectData) => {
    return service.updateProjectData(projectId, projectData);
  }, [service, projectId]);

  if (loading) {
    return <p>Loading...</p>
  }

  if (error) {
    return <ErrorPage message={errMsg} />
  }

  if (!result) {
    return <ErrorPage message={errMsg} />
  }

  return (
    <Dashboard
      state={result.data}
      updateProjectData={updateProjectData}
      title={result.meta.title}
      projectsUrlPath="/"
    />
  );
}
