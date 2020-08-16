import { Status, Task, User, Tag, Comment } from './types';
const { v4: uuid } = require('uuid');

export const makeUser = (user: Partial<User> = {}): User => {
  return {
    id: user.id || uuid(),
    username: user.username || '',
    ...user
  };
};

export const makeTask = (task: Partial<Task> = {}): Task => {
  return {
    id: task.id || uuid(),
    title: task.title || '',
    description: task.description || '',
    statusId: task.statusId || '',
    tagIds: task.tagIds || [],
    creatorId: task.creatorId || '',
    assigneeId: task.assigneeId,
    rootCommentIds: task.rootCommentIds || [],
  };
};

export const makeStatus = (status: Partial<Status> = {}): Status => {
  return {
    id: status.id || uuid(),
    title: status.title || '',
    taskIds: status.taskIds || [],
  };
};

export const makeTag = (tag: Partial<Tag>): Tag => {
  return {
    id: tag.id || uuid(),
    value: tag.value || '',
    taskIds: tag.taskIds || [],
  };
};
export const makeComment = (comment: Partial<Comment>): Comment => {
  return {
    id: comment.id || uuid(),
    creatorId: comment.creatorId || '',
    value: comment.value || '',
    taskId: '',
    parentCommentId: '',
    childCommentIds: [],
    ts: comment.ts || null
  };
};
