import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';

import { ConfirmationButtons } from '../components/buttons';

export interface Props {
  title?: string,
  description?: string,
  onSubmit: (title: string) => void
  onCancel: () => void
}

export default function TaskEditorForm({
  onSubmit,
  onCancel,
  title: initialTitle = '',
}: Props) {
  const [title, setTitle] = useState(initialTitle);

  const handleSubmit = () => {
    if (title) {
      onSubmit(title);
      setTitle('');
    }
  };

  const handleCancel = () => {
    onCancel();
    setTitle('');
  };

  return (
    <div>
      <TextField
        autoFocus
        fullWidth
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />

      <ConfirmationButtons onConfirm={handleSubmit} onCancel={handleCancel} />
    </div>
  );
}
