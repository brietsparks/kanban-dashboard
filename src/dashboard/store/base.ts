import makeNormalizedSlice, { Cardinalities, Schema } from 'normalized-reducer';
import { ProjectData } from './types';

const { MANY, ONE } = Cardinalities;

export const schema: Schema = {
  user: {
    createdTaskIds: { type: 'task', cardinality: MANY, reciprocal: 'creatorId' },
    assignedTaskIds: { type: 'task', cardinality: MANY, reciprocal: 'assigneeId' },
    commentIds: { type: 'comment', cardinality: MANY, reciprocal: 'creatorId' },
  },
  task: {
    creatorId: { type: 'user', cardinality: ONE, reciprocal: 'createdTaskIds' },
    assigneeId: { type: 'user', cardinality: ONE, reciprocal: 'assignedTaskIds' },
    statusId: { type: 'status', cardinality: ONE, reciprocal: 'taskIds' },
    tagIds: { type: 'tag', cardinality: MANY, reciprocal: 'taskIds' },
    rootCommentIds: { type: 'comment', cardinality: MANY, reciprocal: 'taskId' }
  },
  status: {
    taskIds: { type: 'task', cardinality: MANY, reciprocal: 'statusId' }
  },
  tag: {
    taskIds: { type: 'task', cardinality: MANY, reciprocal: 'tagIds' }
  },
  comment: {
    creatorId: { type: 'user', cardinality: ONE, reciprocal: 'commentIds' },
    taskId: { type: 'task', cardinality: ONE, reciprocal: 'rootCommentIds', },
    parentCommentId: { type: 'comment', cardinality: ONE, reciprocal: 'childCommentIds' },
    childCommentIds: { type: 'comment', cardinality: MANY, reciprocal: 'parentCommentId' }
  }
};

export const {
  actionCreators,
  selectors,
  emptyState: emptyProjectData,
  actionTypes,
  reducer,
} = makeNormalizedSlice<ProjectData>(schema, (actionType: string) => `project/${actionType}`);
