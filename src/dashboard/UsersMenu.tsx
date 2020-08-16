import React, { Fragment, useState } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import CurrentUserIcon from '@material-ui/icons/AccountCircle';
import NonCurrentUserIcon from '@material-ui/icons/RadioButtonUnchecked';
import TextField from '@material-ui/core/TextField';

import { hooks } from './store';
import { useCurrentUserId, useSetCurrentUserId } from './CurrentUser';
import { ConfirmationButtons, EditButton } from '../components/buttons';
import { useUserItemStyles, useUserEditorStyles } from './styles';

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
    <List>
      <ListItem>
        {isEditorOpen
          ? <UserEditorForm onSubmit={submitNewUser} onCancel={closeEditor} username="" />
          : <Button onClick={openEditor} fullWidth color="primary">New User</Button>
        }
      </ListItem>
      {ids.map(id => (
        <ListItem key={id}>
          <UserItem id={id} />
        </ListItem>
      ))}
    </List>
  );
}

export interface UserItemProps {
  id: string
}
export function UserItem({ id }: UserItemProps) {
  const user = hooks.useUser(id);
  const currentUserId = useCurrentUserId();
  const setCurrentUserId = useSetCurrentUserId();
  const updateUser = hooks.useUpdateUser();
  const [isEditing, setIsEditing] = useState(false);
  const classNames = useUserItemStyles();

  const isCurrentUser =  user.id === currentUserId
  const openEditor = () => setIsEditing(true);
  const closeEditor = () => setIsEditing(false);
  const handleClick = () => setCurrentUserId(user.id);
  const handleUpdateUsername = (username: string) => {
    updateUser(id, { username });
    closeEditor();
  }

  const icon = isCurrentUser ? <CurrentUserIcon/> : <NonCurrentUserIcon/>;

  const username = isEditing
    ? (
      <UserEditorForm
        username={user.username}
        onCancel={closeEditor}
        onSubmit={handleUpdateUsername}
      />
    )
    : user.username;

  return (
    <Fragment>
      <ListItemAvatar>
        <IconButton onClick={handleClick} color="primary">
          {icon}
        </IconButton>
      </ListItemAvatar>

      <ListItemText>{username}</ListItemText>

      <span className={classNames.editBtn}>
        <EditButton onClick={openEditor} />
      </span>
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
  const classNames = useUserEditorStyles();

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
    <div className={classNames.root}>
      <TextField
        autoFocus
        fullWidth
        placeholder="Username"
        value={value}
        onChange={e => setValue(e.target.value)}
      />

      <ConfirmationButtons onConfirm={handleSubmit} onCancel={handleCancel} />
    </div>
  );
}
