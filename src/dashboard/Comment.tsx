import React from 'react';

import { Comment as CommentView } from '../components/comment';
import { hooks, emptyArray } from './store';
import { useCurrentUserId } from './CurrentUser';

export interface Props {
  id: string,
  taskId?: string,
  parentCommentId?: string,
}
export default function Comment({ id }: Props) {
  const comment = hooks.useComment(id);
  const createChildComment = hooks.useCreateChildComment();
  const username = hooks.useCommentUsername(id);
  const currentUserId = useCurrentUserId();

  if (!comment) {
    return null;
  }

  const { value, childCommentIds } = comment;

  const handleSubmitReply = (value: string, ts: Date) => {
    createChildComment({ value, parentCommentId: id, creatorId: currentUserId, ts });
  };

  const childCommentsElement = (
    <>{(childCommentIds || emptyArray).map(childId => <Comment key={childId} id={childId}/>)}</>
  );

  return (
    <CommentView
      username={username}
      value={value}
      childComments={childCommentsElement}
      onSubmitReply={handleSubmitReply}
      ts={comment.ts}
    />
  );
}
