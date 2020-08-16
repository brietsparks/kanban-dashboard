import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { DraggableProvidedDragHandleProps } from 'react-beautiful-dnd';

import { OptionsPopper } from '../components/options-popper';

import { hooks } from './store';
import TaskDetails from './TaskDetails';
import { useCardStyles } from './styles';


export interface Props {
  id: string,
  statusId: string,
  dragHandleProps: DraggableProvidedDragHandleProps
}

export default function TaskCard({ id, dragHandleProps }: Props) {
  const classNames = useCardStyles();
  const { title, assigneeId } = hooks.useTask(id);
  const assignee = hooks.useUser(assigneeId);
  const deleteTask = hooks.useDeleteTask();
  const handleClickDelete = () => {
    if (deleteTask) {
      deleteTask(id);
    }
  };

  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const openDetails = () => setIsDetailsOpen(true);
  const closeDetails = () => setIsDetailsOpen(false);

  return (
    <Paper className={classNames.task} {...dragHandleProps}>
      <div className={classNames.taskHeader}>
        <div>
          <Typography className={classNames.title}>{title}</Typography>

          {assignee &&
          <Typography variant="subtitle2">Assigned to {assignee.username}</Typography>
          }
        </div>

        <OptionsPopper>
          <List>
            <ListItem button onClick={openDetails}>
              <ListItemText primary="View & Edit"/>
            </ListItem>
            <ListItem button onClick={handleClickDelete}>
              <ListItemText primary="Delete"/>
            </ListItem>
          </List>
        </OptionsPopper>
      </div>

      {isDetailsOpen &&
      <TaskDetails
        id={id}
        isOpen={isDetailsOpen}
        close={closeDetails}
      />
      }
    </Paper>
  );
}

