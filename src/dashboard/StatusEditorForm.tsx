import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';

import { ConfirmationButtons } from '../components/buttons';

export interface Props {
  title?: string,
  onSubmit: (title: string) => void,
  onCancel: () => void
}

export default function StatusEditorForm({ title: initialTitle = '', onSubmit, onCancel }: Props) {
  const [value, setValue] = useState(initialTitle);

  const handleSubmit = () => {
    if (value) {
      onSubmit(value);
      setValue('');
    }
  };

  const handleCancel = () => {
    onCancel();
    setValue('');
  };

  return (
    <div>
      <TextField
        autoFocus
        fullWidth
        placeholder="Column Title"
        value={value}
        onChange={e => setValue(e.target.value)}
      />

      <ConfirmationButtons onConfirm={handleSubmit} onCancel={handleCancel} />
    </div>
  );
}
