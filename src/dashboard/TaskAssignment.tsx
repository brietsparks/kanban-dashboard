import React, { ChangeEvent, forwardRef } from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import { TextButton } from '../components/buttons';

import { hooks } from './store';
import { useTaskAssignmentStyles } from './styles';

export interface Props {
  id: string
}

export default function TaskAssignment({ id }: Props) {
  const userIds = hooks.useUserIds();
  const { assigneeId } = hooks.useTask(id);
  const assignTask = hooks.useAssignTask();
  const unassignTask = hooks.useUnassignTask();

  const handleUnassignment = () => {
    unassignTask(id, assigneeId);
  };

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const userId = e.target.value as string;

    userId
      ? assignTask(id, userId)
      : handleUnassignment();
  };

  const classNames = useTaskAssignmentStyles();

  return (
    <div className={classNames.container}>
      <Select
        value={assigneeId || ''}
        onChange={handleChange}
        variant="outlined"
        className={classNames.select}
      >
        <MenuItem value="" selected={!assigneeId}>&nbsp;</MenuItem>
        {userIds.map(userId => (
          <MenuItem key={userId} value={userId} selected={userId === assigneeId}>
            <AssignableUsername id={userId}/>
          </MenuItem>
        ))}
      </Select>

      {assigneeId &&
      <div className={classNames.unassignBtn}>
        <TextButton onClick={handleUnassignment}>Unassign</TextButton>
      </div>
      }
    </div>
  );
}


export interface AssignableUsernameProps {
  id: string
}
function AssignableUsername({ id }: AssignableUsernameProps) {
  const user = hooks.useUser(id);
  if (!user) {
    return null;
  }

  return (
    <span>{user.username}</span>
  );
}

