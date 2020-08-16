import { Comment, Status, Tag, Task, User, ProjectData } from './types';
import { selectors } from './base';

export const getUserIds = (state: ProjectData) => selectors.getIds(state, { type: 'user' }) as string[];
export const getTaskIds = (state: ProjectData) => selectors.getIds(state, { type: 'task' }) as string[];
export const getStatusIds = (state: ProjectData) => selectors.getIds(state, { type: 'status' }) as string[];
export const getTagIds = (state: ProjectData) => selectors.getIds(state, { type: 'tag' }) as string[];
export const getCommentIds = (state: ProjectData) => selectors.getIds(state, { type: 'comment' }) as string[];

export const getUser = (state: ProjectData, args: { id: string }) => selectors.getEntity<User>(state, { type: 'user', id: args.id });
export const getTask = (state: ProjectData, args: { id: string }) => selectors.getEntity<Task>(state, { type: 'task', id: args.id });
export const getStatus = (state: ProjectData, args: { id: string }) => selectors.getEntity<Status>(state, { type: 'status', id: args.id });
export const getTag = (state: ProjectData, args: { id: string }) => selectors.getEntity<Tag>(state, { type: 'tag', id: args.id });
export const getComment = (state: ProjectData, args: { id: string }) => selectors.getEntity<Comment>(state, { type: 'comment', id: args.id });


export const getCommentUsername = (state: ProjectData, args: { id }) => {
  const comment = getComment(state, args);
  if (!comment) {
    return '';
  }

  const user = getUser(state, { id: comment.creatorId });
  if (!user) {
    return '';
  }

  return user.username;
};
