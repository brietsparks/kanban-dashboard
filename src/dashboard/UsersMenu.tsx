import React, { Fragment, useState } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import CheckIcon from '@material-ui/icons/CheckCircle';
import UncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import TextField from '@material-ui/core/TextField';

import { hooks } from './store';
import { useCurrentUserId, useSetCurrentUserId } from './CurrentUser';
import { ConfirmationButtons } from '../components/buttons';

export default function UsersMenu() {
  const ids = hooks.useUserIds();
  const createUser = hooks.useCreateUser();

  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const openEditor = () => setIsEditorOpen(true);
  const closeEditor = () => setIsEditorOpen(false);
  const submitNewUser = (username: string) => {
    createUser({ username });
    closeEditor();
  }

  return (
    <div>
      <Button onClick={openEditor}>New User</Button>
      {isEditorOpen &&
      <UserEditorForm onSubmit={submitNewUser} onCancel={closeEditor} username="" />
      }

      <List>
        {ids.map(id => (
          <ListItem key={id}>
            <UserItem id={id} />
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export interface UserItemProps {
  id: string
}
export function UserItem({ id }: UserItemProps) {
  const user = hooks.useUser(id);
  const currentUserId = useCurrentUserId();
  const setCurrentUserId = useSetCurrentUserId();

  const isCurrentUser =  user.id === currentUserId
  const handleClick = () => setCurrentUserId(user.id);
  const icon = isCurrentUser ? <CheckIcon/> : <UncheckedIcon/>;

  return (
    <Fragment>
      <ListItemAvatar>
        <IconButton onClick={handleClick} color="primary">
          {icon}
        </IconButton>
      </ListItemAvatar>

      <ListItemText>{user.username}</ListItemText>
    </Fragment>
  );
}

export interface UserEditorFormProps {
  username?: string,
  onSubmit: (username: string) => void,
  onCancel: () => void
}
export function UserEditorForm({ username: initialUsername = '', onSubmit, onCancel }: UserEditorFormProps) {
  const [value, setValue] = useState(initialUsername);

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
