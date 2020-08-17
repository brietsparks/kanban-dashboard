import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useAsyncCallback } from 'react-async-hook';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import { ConfirmationButtons } from '../buttons';
import { useServiceClient } from '../../service';

export interface Props {
  onCancel: () => void
}
export default function ProjectCreatorForm({ onCancel }: Props) {
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
    router.push(`/${createdId}`);
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
