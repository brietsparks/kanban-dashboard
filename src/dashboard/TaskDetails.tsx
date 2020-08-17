import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { EditButton, CloseButton, TextButton } from '../components/buttons';
import { NewComment } from '../components/comment';

import { hooks } from './store';
import Comment from './Comment';
import TaskAssignment from './TaskAssignment';
import { useTaskDetailsStyles } from './styles';
import { useCurrentUserId } from './CurrentUser';
import { useUser } from './store/hooks';

export interface Props {
  id: string,
  isOpen?: boolean,
  close: () => void
}
export default function TaskDetails({ id, isOpen, close }: Props) {
  const { title, rootCommentIds, creatorId } = hooks.useTask(id);
  const updateTask = hooks.useUpdateTask();
  const createComment = hooks.useCreateRootComment();
  const currentUserId = useCurrentUserId();
  const creator = useUser(creatorId);

  //
  // edit title
  //
  const [isTitleEditable, setIsTitleEditable] = useState(false);
  const enableTitleEditing = () => setIsTitleEditable(true);
  const disableTitleEditing = () => setIsTitleEditable(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const editedCleanedTitle = editedTitle.trim();
  const handleClickCancelEditing = () => {
    disableTitleEditing();
    setEditedTitle(title);
  };
  const handleClickDoneEditing = () => {
    if (editedCleanedTitle) {
      updateTask(id, { title: editedTitle });
      disableTitleEditing();
    }
  };

  //
  // comments
  //
  const [isCommentFormShown, setIsCommentFormShown] = useState(false);
  const showCommentForm = () => setIsCommentFormShown(true);
  const hideCommentForm = () => setIsCommentFormShown(false);
  const handleSubmitComment = (value: string) => {
    createComment({ value, taskId: id, creatorId: currentUserId, ts: new Date() });
    hideCommentForm();
  };

  const classNames = useTaskDetailsStyles();

  return (
    <Dialog open={isOpen} onBackdropClick={close} fullWidth>
      <div className={classNames.root}>
          <div className={classNames.header}>
            <div className={classNames.title}>
              {!isTitleEditable &&
              <Typography>
                {title} <EditButton onClick={enableTitleEditing} />
              </Typography>
              }

              {isTitleEditable &&
              <>
                <TextField
                  fullWidth
                  autoFocus
                  value={editedTitle}
                  onChange={e => setEditedTitle(e.target.value)}
                  placeholder="Title"
                />

                <div>
                  <Button onClick={handleClickCancelEditing} variant="text">Cancel</Button>
                  <Button
                    onClick={handleClickDoneEditing}
                    color="primary"
                    disabled={!editedCleanedTitle}
                  >Save</Button>
                </div>
              </>
              }
            </div>
            <span className={classNames.closeBtn}>
              <CloseButton onClick={close}/>
            </span>
          </div>

          <div className={classNames.section}>
            <Typography variant="subtitle2">Created by {creator.username}</Typography>
          </div>

          <div className={classNames.section}>
            <Typography variant="subtitle2">Assigned to:</Typography>
            <TaskAssignment id={id} />
          </div>

          <div className={classNames.section}>
            <Typography variant="subtitle2">{rootCommentIds?.length ? 'Comments:' : 'No comments yet...'}</Typography>

            {isCommentFormShown
              ? <NewComment onSubmit={handleSubmitComment} onCancel={hideCommentForm}/>
              : <TextButton onClick={showCommentForm}>Leave a comment</TextButton>
            }

            {rootCommentIds?.map(commentId => (
              <Comment key={commentId} id={commentId} />
            ))}
          </div>
        </div>
    </Dialog>
  );
}
