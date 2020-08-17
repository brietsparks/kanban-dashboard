import React, { useState } from 'react';
import { useAsync, useAsyncCallback } from 'react-async-hook';
import Button from '@material-ui/core/Button';
import Router from 'next/router'

import { useServiceClient } from '../../service';
import { ProjectMeta } from '../../dashboard/store/types';
import { useProjectsStyles } from './styles';
import ProjectCreatorForm from './ProjectCreatorForm';
import Project from './Project';

// @ts-ignore
import ProjectsImg from '../../images/projects.svg';

export default function ProjectsMenu() {
  const service = useServiceClient();
  const {
    error: errorLoading,
    loading,
    result
  } = useAsync<(ProjectMeta)[]>(service.getUserProjectsMeta.bind(service), []);

  const { error: errorDeleting, execute: handleDelete } = useAsyncCallback((id: string) => {
    service.deleteProject(id);
    Router.reload();
  });

  const classNames = useProjectsStyles();

  const [isCreatorOpen, setIsCreatorOpen] = useState(false);
  const openCreator = () => setIsCreatorOpen(true);
  const closeCreator = () => setIsCreatorOpen(false);

  return (
    <div className={classNames.root}>
      <div className={classNames.menu}>
        {isCreatorOpen
          ? <ProjectCreatorForm onCancel={closeCreator} />
          : <Button onClick={openCreator} color="primary">New Project</Button>
        }

        {result && result.map(({ id, title, description }: ProjectMeta) => {
          return (
            <Project key={id} id={id} title={title} description={description} onDelete={handleDelete} />
          );
        })}
      </div>

      <ProjectsImg className={classNames.image} />
    </div>
  );
}
