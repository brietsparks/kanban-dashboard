import React, { Fragment, useState } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import CheckIcon from '@material-ui/icons/CheckCircle';
import UncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';

import { hooks } from './store';
import { useCurrentUserId, useSetCurrentUserId } from './CurrentUser';

export default function UsersMenu() {
  const ids = hooks.useUserIds();
  const createUser = hooks.useCreateUser();

  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const openEditor = () => setIsEditorOpen(true);
  const closeEditor = () => setIsEditorOpen(false);

  return (
    <div>
      <Button onClick={openEditor}>New User</Button>

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

function NewUser() {
  return (
    <div></div>
  );
}
