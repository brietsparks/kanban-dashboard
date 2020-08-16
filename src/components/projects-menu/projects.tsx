import React, { useState } from 'react';
import { useAsync, useAsyncCallback } from 'react-async-hook';
import { useRouter } from 'next/router';
import Link from 'next/link'
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import NavigateIcon from '@material-ui/icons/OpenInNew';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import { useServiceClient } from '../../service';
import { ProjectMeta } from '../../service/interfaces';
import { TextButton, ConfirmationButtons } from '../buttons';
import { useProjectsStyles, useProjectStyles } from './styles';

// @ts-ignore
import ProjectsImg from '../../images/projects.svg';

const noop = () => {};

export default function Projects() {
  const service = useServiceClient();
  const { error, loading, result } = useAsync<(ProjectMeta)[]>(service.getUserProjectsMeta.bind(service), []);
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
            <Project key={id} id={id} title={title} description={description} />
          );
        })}
      </div>

      <ProjectsImg className={classNames.image} />
    </div>
  );
}

export interface ProjectProps {
  id: string,
  title: string,
  description: string
}

export function Project({ id, title, description }: ProjectProps) {
  const classNames = useProjectStyles();

  return (
    <div key={id} className={classNames.root}>
      <div className={classNames.header}>
        <Typography variant="h4" component="h2">{title}</Typography>

        <div>
          <Link href={`/projects/${id}`}>
            <IconButton onClick={noop}><NavigateIcon/></IconButton>
          </Link>
        </div>
      </div>

      <div>
        <Typography>{description}</Typography>
      </div>
    </div>
  );
}

export interface ProjectCreatorFormProps {
  onCancel: () => void
}
export function ProjectCreatorForm({ onCancel }: ProjectCreatorFormProps) {
  const service = useServiceClient();
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [boilerplate, setBoilerplate] = useState(true);

  const handleChangeBoilerplate = (e, value) => setBoilerplate(value);

  const handleCancel = () => {
    setTitle('');
    setDescription('');
    onCancel();
  }

  const { execute, loading, error, result: createdId } = useAsyncCallback(service.createProject.bind(service));

  if (createdId) {
    router.push(`/projects/${createdId}`);
    return null;
  }

  const handleConfirm = () => {
    const cleanedTitle = title.trim();
    const cleanedDescription = description.trim();
    if (!!cleanedTitle) {
      execute(cleanedTitle, cleanedDescription, boilerplate);
      setTitle('');
      setDescription('');
    }
  };

  return (
    <div>
      <TextField
        autoFocus
        placeholder="Title"
        size="medium"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />

      <TextField
        fullWidth
        placeholder="Description"
        size="medium"
        value={description}
        onChange={e => setDescription(e.target.value)}
      />

      <FormControlLabel
        control={
          <Checkbox
            checked={boilerplate}
            onChange={handleChangeBoilerplate}
            color="primary"
          />
        }
        label="Use basic kanban template"
      />

      <ConfirmationButtons onCancel={handleCancel} onConfirm={handleConfirm} />

      {loading && <span>Creating ...</span>}
      {error && <span>Error</span>}
    </div>
  );
}
