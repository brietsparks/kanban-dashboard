import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { actions, selectors, State } from './index';

export function useCreateUser() {
  const dispatch = useDispatch();
  return useCallback((user: { id?: string, username: string}) => {
    dispatch(actions.createUser(user));
  }, [dispatch]);
}
export function useUpdateUser() {
  const dispatch = useDispatch();
  return useCallback((id: string, user: { username?: string}) => {
    dispatch(actions.updateUser(id, user));
  }, [dispatch]);
}

export function useCreateTask() {
  const dispatch = useDispatch();
  return useCallback((task: { title: string, creatorId: string, statusId: string }) => {
    dispatch(actions.createTask(task));
  }, [dispatch]);
}
export function useUpdateTask() {
  const dispatch = useDispatch();
  return useCallback((id: string, task: { title?: string, description?: string }) => {
    dispatch(actions.updateTask(id, task));
  }, [dispatch]);
}
export function useDeleteTask() {
  const dispatch = useDispatch();
  return useCallback((id: string) => {
    dispatch(actions.deleteTask(id));
  }, [dispatch]);
}
export function useAssignTask() {
  const dispatch = useDispatch();
  return useCallback((taskId: string, userId: string) => {
    dispatch(actions.assignTask(taskId, userId));
  }, [dispatch])
}
export function useUnassignTask() {
  const dispatch = useDispatch();
  return useCallback((taskId: string, userId: string) => {
    dispatch(actions.unassignTask(taskId, userId));
  }, [dispatch])
}


export function useCreateStatus() {
  const dispatch = useDispatch();
  return useCallback((status: { title: string }) => {
    dispatch(actions.createStatus(status));
  }, [dispatch]);
}
export function useUpdateStatus() {
  const dispatch = useDispatch();
  return useCallback((id: string, status: { title?: string }) => {
    dispatch(actions.updateStatus(id, status));
  }, [dispatch]);
}
export function useDeleteStatus() {
  const dispatch = useDispatch();
  return useCallback((id: string) => {
    dispatch(actions.deleteStatus(id));
  }, [dispatch]);
}


export function useCreateTag() {
  const dispatch = useDispatch();
  return useCallback((tag: { value: string }) => {
    dispatch(actions.createTag(tag));
  }, [dispatch]);
}
export function useCreateRootComment() {
  const dispatch = useDispatch();
  return useCallback((comment: { value: string, taskId: string, creatorId: string, ts: Date }) => {
    dispatch(actions.createRootComment(comment));
  }, [dispatch]);
}
export function useCreateChildComment() {
  const dispatch = useDispatch();
  return useCallback((comment: { value: string, parentCommentId: string, creatorId: string, ts: Date }) => {
    dispatch(actions.createChildComment(comment));
  }, [dispatch]);
}
export function useDeleteComment() {
  const dispatch = useDispatch();
  return useCallback((id: string) => {
    dispatch(actions.deleteComment(id));
  }, [dispatch]);
}



export function useMoveStatus() {
  const dispatch = useDispatch();
  return useCallback((src: number, dest: number) => {
    dispatch(actions.moveStatus(src, dest));
  }, [dispatch]);
}

export function useMoveStatusTask() {
  const dispatch = useDispatch();
  return useCallback((taskId: string, srcStatusId: string, src: number, destStatusId: string, dest: number) => {
    dispatch(actions.moveStatusTask(taskId, srcStatusId, src, destStatusId, dest));
  }, [dispatch]);
}


export function useUserIds() {
  return useSelector((state: State) => selectors.getUserIds(state));
}
export function useTaskIds() {
  return useSelector((state: State) => selectors.getTaskIds(state));
}
export function useStatusIds() {
  return useSelector((state: State) => selectors.getStatusIds(state));
}
export function useTagIds() {
  return useSelector((state: State) => selectors.getTagIds(state));
}
export function useCommentIds() {
  return useSelector((state: State) => selectors.getCommentIds(state));
}


export function useUser(id: string) {
  return useSelector((state: State) => selectors.getUser(state, { id }));
}
export function useTask(id: string) {
  return useSelector((state: State) => selectors.getTask(state, { id }));
}
export function useStatus(id: string) {
  return useSelector((state: State) => selectors.getStatus(state, { id }));
}
export function useTag(id: string) {
  return useSelector((state: State) => selectors.getTag(state, { id }));
}
export function useComment(id: string) {
  return useSelector((state: State) => selectors.getComment(state, { id }));
}

export function useCommentUsername(id: string) {
  return useSelector((state: State) => selectors.getCommentUsername(state, { id }));
}
