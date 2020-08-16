import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { useStyles } from './styles';

export interface Props {
  onSubmit: (value: string, ts: Date) => void,
  onCancel?: () => void,
}

export default function NewComment({ onSubmit, onCancel }: Props) {
  const [value, setValue] = useState('');
  const classNames = useStyles();

  const handleClickSubmit = () => {
    if (!!value) {
      onSubmit(value, new Date());
      setValue('');
    }
  };

  const handleClickCancel = () => {
    onCancel();
    setValue('');
  };

  return (
    <div>
      <TextField
        multiline autoFocus fullWidth
        value={value}
        onChange={e => setValue(e.target.value)}
        placeholder="Leave a comment:"
      />
      <div className={classNames.newCommentButtons}>
        <div>
          <Button onClick={handleClickCancel} variant="text">Cancel</Button>
          <Button onClick={handleClickSubmit} color="primary">Reply</Button>
        </div>
      </div>
    </div>
  );
}
