import { useAsync } from 'react-async-hook';
import { emptyProjectData } from './store';
import { Project as ProjectState } from './store/types';

import { useServiceClient } from '../service';
import { StoreProvider } from './store';
import ProjectBoard from './ProjectBoard';

export interface Props {
  id?: string
}
export default function Project({ id }: Props) {
  const service = useServiceClient();
  const { error, loading, result } = useAsync<ProjectState>(service.getProject.bind(service), [id]);

  if (loading) {
    return <p>loading project</p>
  }

  if (error) {
    return <p>error loading project</p>
  }

  const state = result.data || emptyProjectData;

  return (
    <StoreProvider projectId={id} state={state}>
      <ProjectBoard/>
    </StoreProvider>
  );
}
