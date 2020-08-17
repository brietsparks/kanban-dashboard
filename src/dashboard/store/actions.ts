import { Task, User, Tag } from './types';
import { actionCreators } from './base';
import { makeTask, makeUser, makeStatus, makeTag, makeComment } from './factory';

export const createUser = (data: Partial<User>) => {
  const user = makeUser(data);
  return actionCreators.create('user', user.id, user);
};

export const updateUser = (id: string, data: { username?: string }) => {
  return actionCreators.update('user', id, data);
}

export const createStatus = (data: { id?: string, title: string }) => {
  const status = makeStatus(data);
  return actionCreators.create('status', status.id, status);
};

export const updateStatus = (id: string, status: { title?: string }) => {
  return actionCreators.update('status', id, status);
};

const commentCascade = () => ({ childCommentIds: commentCascade })

export const deleteStatus = (id: string) => {
  const cascade = {
    taskIds: { rootCommentIds: { childCommentIds: commentCascade } }
  };
  return actionCreators.delete('status', id, cascade);
};

export const createTask = (data: Partial<Task>) => {
  const task = makeTask(data);

  return actionCreators.batch(
    actionCreators.create('task', task.id, task),
    actionCreators.attach('task', task.id, 'creatorId', task.creatorId),
    actionCreators.attach('task', task.id, 'statusId', task.statusId),
  );
};

export const updateTask = (id: string, task: { title?: string }) => {
  return actionCreators.update('task', id, task);
};

export const deleteTask = (id: string) => {
  const cascade = { rootCommentIds: { childCommentIds: commentCascade } };
  return actionCreators.delete('task', id, cascade);
};

export const assignTask = (taskId: string, userId: string) => {
  return actionCreators.attach('task', taskId, 'assigneeId', userId);
};

export const unassignTask = (taskId: string, userId: string) => {
  return actionCreators.detach('task', taskId, 'assigneeId', userId);
};

export const createTag = (data: Partial<Tag>) => {
  const tag = makeTag(data);
  return actionCreators.create('tag', tag.id, tag);
};

export const createRootComment = (data: { id?: string, taskId: string, value: string, creatorId: string }) => {
  const comment = makeComment(data);

  // a root comment must have a task
  // so create the comment and attach it to the task
  return actionCreators.batch(
    actionCreators.create('comment', comment.id, comment),
    actionCreators.attach('comment', comment.id, 'creatorId', data.creatorId),
    actionCreators.attach('comment', comment.id, 'taskId', data.taskId)
  );
};

export const createChildComment = (data: { id?: string, parentCommentId: string, value: string, creatorId: string, ts: Date }) => {
  const comment = makeComment(data);

  return actionCreators.batch(
    actionCreators.create('comment', comment.id, comment),
    actionCreators.attach('comment', comment.id, 'creatorId', data.creatorId),
    actionCreators.attach('comment', comment.id, 'parentCommentId', data.parentCommentId)
  );
};

export const deleteComment = (id: string) => {
  const cascade = { childCommentIds: commentCascade };
  return actionCreators.delete('comment', id, cascade);
};

export const moveStatus = (src: number, dest: number) => {
  return actionCreators.move('status', src, dest);
};

export const moveStatusTask = (taskId: string, srcStatusId: string, src: number, destStatusId: string, dest: number) => {
  if (srcStatusId === destStatusId) {
    return actionCreators.moveAttached('status', srcStatusId, 'taskIds', src, dest);
  } else {
    return actionCreators.attach('status', destStatusId, 'taskIds', taskId, { index: dest })
  }
};
