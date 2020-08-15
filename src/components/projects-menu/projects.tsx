import { useState } from 'react';
import { useAsync, useAsyncCallback } from 'react-async-hook';
import { useServiceClient } from '../../service';
import { useRouter } from 'next/router';

import { TextButton } from '../buttons';

interface Props {
  userId: string,
}

export default function Projects({ userId }: Props) {
  const service = useServiceClient();
  const { error, loading, result } = useAsync<({ id: string, title: string })[]>(
    service.getUserProjectTitles.bind(service), [userId]
  );

  const router = useRouter();

  return (
    <div>
      <NewProject/>
      {result && result.map(({ id, title }) => {
        return (
          <div>
            <TextButton key={id} onClick={() => router.push(`/projects/${id}`)}>{title}</TextButton>
          </div>
        )
      })}
    </div>
  );
}

export function NewProject() {
  const service = useServiceClient();
  const router = useRouter();
  const [title, setTitle] = useState('');

  const { execute, loading, error, result: createdId } = useAsyncCallback(service.createNewProject.bind(service));

  if (createdId) {
    router.push(`/projects/${createdId}`);
    return null;
  }

  const handleClick = () => {
    const cleaned = title.trim();
    if (!!cleaned) {
      setTitle('');
      execute(title);
    }
  };

  return (
    <div>
      <input value={title} onChange={e => setTitle(e.target.value)} />
      <button onClick={handleClick}>Create</button>
      {loading && <span>Creating ...</span>}
      {error && <span>Error</span>}
    </div>
  );
}
