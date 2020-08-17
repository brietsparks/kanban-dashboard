import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import Dialog from '@material-ui/core/Dialog';
import DragIndicator from '@material-ui/icons/DragIndicator';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';


import {
  Draggable,
  DraggableProvided,
  Droppable,
  DroppableProvided,
  DraggableProvidedDragHandleProps
} from 'react-beautiful-dnd';

import { hooks, emptyArray } from './store';

import { OptionsPopper } from '../components/options-popper';
import { ConfirmationButtons } from '../components/buttons';
import StatusEditorForm from './StatusEditorForm';
import TaskCard from './TaskCard';
import TaskEditorForm from './TaskEditorForm';
import { useLaneStyles, useCommonStyles } from './styles';
import { useCurrentUserId } from './CurrentUser';


export interface Props {
  id: string,
  dragHandleProps: DraggableProvidedDragHandleProps
}

export default function StatusLane({ id, dragHandleProps }: Props) {
  const currentUserId = useCurrentUserId();
  const createTask = hooks.useCreateTask();
  const updateStatus = hooks.useUpdateStatus();
  const deleteStatus = hooks.useDeleteStatus();
  const { title, taskIds } = hooks.useStatus(id);

  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);
  const openTaskForm = () => setIsTaskFormOpen(true);
  const closeTaskForm = () => setIsTaskFormOpen(false);

  const [isStatusEditorOpen, setIsStatusEditorOpen] = useState(false);
  const openStatusEditor = () => setIsStatusEditorOpen(true);
  const closeStatusEditor = () => setIsStatusEditorOpen(false);

  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const openDeleteConfirm = () => setIsDeleteConfirmOpen(true);
  const closeDeleteConfirm = () => setIsDeleteConfirmOpen(false);

  const handleSubmitNewTask = (title: string) => {
    if (createTask && currentUserId) {
      createTask({ title, statusId: id, creatorId: currentUserId });
    }
    closeTaskForm();
  };

  const handleSubmitEditStatus = (title: string) => {
    if (updateStatus) {
      updateStatus(id, { title })
    }
    closeStatusEditor();
  };

  const handleConfirmDelete = () => {
    if (deleteStatus) {
      deleteStatus(id);
    }
  };

  const classNames = useLaneStyles();
  const commonClassNames = useCommonStyles();

  return (
    <Paper
      className={`${classNames.lane} board-status`}
      elevation={0}
    >
      <div className={classNames.laneHeader}>
        <span {...dragHandleProps} className={commonClassNames.dragHandle}>
          <DragIndicator fontSize="small" />
        </span>

        <Typography align="center" className={classNames.laneTitle}>{title}</Typography>

        <div className={classNames.buttons}>
          <IconButton onClick={openTaskForm}>
            <AddIcon />
          </IconButton>

          <OptionsPopper>
            <StatusOptions
              onClickEdit={openStatusEditor}
              onClickDelete={openDeleteConfirm}
            />
          </OptionsPopper>
        </div>

        <Dialog open={isStatusEditorOpen}>
          <Paper className={classNames.dialog}>
            <StatusEditorForm
              title={title}
              onSubmit={handleSubmitEditStatus}
              onCancel={closeStatusEditor}
            />
          </Paper>
        </Dialog>

        <Dialog open={isDeleteConfirmOpen}>
          <Paper className={classNames.dialog}>
            <Typography>Delete column "{title}"?</Typography>
            <ConfirmationButtons
              onCancel={closeDeleteConfirm}
              onConfirm={handleConfirmDelete}
              confirmColor="secondary"
              confirmLabel="Delete"
            />
          </Paper>
        </Dialog>
      </div>

      <div className={classNames.form}>
        {isTaskFormOpen && (
          <TaskEditorForm onSubmit={handleSubmitNewTask} onCancel={closeTaskForm}/>
        )}
      </div>

      <Droppable type="taskCard" droppableId={id.toString()}>
        {(provided: DroppableProvided) => {
          return (
            <div ref={provided.innerRef} {...provided.droppableProps} className={classNames.tasks}>
              {(taskIds || emptyArray).map((taskId, index) => (
                <Draggable key={taskId} draggableId={taskId.toString()} index={index}>
                  {(provided: DraggableProvided) => {
                    return (
                      <div className={classNames.taskContainer} ref={provided.innerRef} {...provided.draggableProps}>
                        <TaskCard statusId={id} id={taskId} dragHandleProps={provided.dragHandleProps} />
                      </div>
                    )
                  }}
                </Draggable>
              ))}
            </div>
          )
        }}
      </Droppable>
    </Paper>
  );
}

export interface StatusOptionsProps {
  onClickEdit: () => void,
  onClickDelete: () => void
}

export function StatusOptions({ onClickEdit, onClickDelete }: StatusOptionsProps) {
  return (
    <List>
      <ListItem button onClick={onClickEdit}>
        <ListItemText primary="Edit Column"/>
      </ListItem>
      <ListItem button onClick={onClickDelete}>
        <ListItemText primary="Delete Column"/>
      </ListItem>
    </List>
  );
}
