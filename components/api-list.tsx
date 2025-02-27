'use client';

import ApiItem from '@/components/api-item';
import { useOrigin } from '@/hooks/use-origin';
import { useUser } from '@stackframe/stack';

interface ApiListProps {
  entityName: string;
  entityIdName: string;
}

export default function ApiList({ entityName, entityIdName }: ApiListProps) {
  const origin = useOrigin();
  const user = useUser();

  const baseUrl = `${origin}/api/${user?.selectedTeam?.id}`;

  return (
    <>
      <ApiItem
        title="GET"
        variant="public"
        description={`${baseUrl}/${entityName}`}
      />
      <ApiItem
        title="GET"
        variant="public"
        description={`${baseUrl}/${entityName}/{${entityIdName}}`}
      />
      {/* <ApiItem
        title="POST"
        variant="admin"
        description={`${baseUrl}/${entityName}`}
      />
      <ApiItem
        title="PATCH"
        variant="admin"
        description={`${baseUrl}/${entityName}/{${entityIdName}}`}
      />
      <ApiItem
        title="DELETE"
        variant="admin"
        description={`${baseUrl}/${entityName}/{${entityIdName}}`}
      /> */}
    </>
  );
}
