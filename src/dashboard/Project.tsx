import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import {
  DragDropContext,
  DropResult,
  Droppable,
  DroppableProvided,
  Draggable,
  DraggableProvided,
} from 'react-beautiful-dnd';

import { hooks, emptyArray } from './store';
import { useBoardStyles } from './styles';
import StatusEditorForm from './StatusEditorForm';
import StatusLane from './StatusLane';

export default function Project() {
  const statusIds = hooks.useStatusIds();
  const createStatus = hooks.useCreateStatus();
  const moveStatus = hooks.useMoveStatus();
  const moveTask = hooks.useMoveStatusTask();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const classNames = useBoardStyles();

  const handleSubmitNewStatus = (title: string) => {
    if (createStatus) {
      createStatus({ title });
    }
    setIsFormOpen(false);
  };

  const handleCancelNewStatus = () => setIsFormOpen(false);

  const handleDragEnd = ({ type, source, destination, draggableId }: DropResult) => {
    if (source && destination) {
      if (type === 'statusLane' && moveStatus) {
        moveStatus(source.index, destination.index);
      }

      if (type === 'taskCard' && moveTask) {
        moveTask(
          draggableId,
          source.droppableId,
          source.index,
          destination.droppableId,
          destination.index
        )
      }
    }
  };

  return (
    <div className={classNames.board}>
      <DragDropContext onDragEnd={handleDragEnd}>
        {createStatus && (
          <Dialog open={isFormOpen}>
            <Paper className={classNames.dialog}>
              <StatusEditorForm
                onSubmit={handleSubmitNewStatus}
                onCancel={handleCancelNewStatus}
              />
            </Paper>
          </Dialog>
        )}

        <Droppable type="statusLane" droppableId="projectBoard" direction="horizontal">
          {(provided: DroppableProvided) => {
            return (
              <div ref={provided.innerRef} {...provided.droppableProps} className={classNames.lanes}>
                {(statusIds || emptyArray).map((statusId, index) => (
                  <Draggable key={statusId} draggableId={statusId.toString()} index={index}>
                    {(provided: DraggableProvided) => {
                      return (
                        <div className={classNames.laneContainer} ref={provided.innerRef} {...provided.draggableProps}>
                          <StatusLane id={statusId} dragHandleProps={provided.dragHandleProps} />
                        </div>
                      )
                    }}
                  </Draggable>
                ))}

                {provided.placeholder}

                <Button
                  className={classNames.newStatusLane}
                  onClick={() => setIsFormOpen(true)}
                  variant="outlined"
                >Add Column</Button>
              </div>
            )
          }}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
