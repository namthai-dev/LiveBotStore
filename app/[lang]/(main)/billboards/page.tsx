'use client';
import React from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { billboard } from '@/features/billboard/api';
import { useUser } from '@stackframe/stack';

export default function Page() {
  const user = useUser();
  const teamId = user?.selectedTeam?.id || '';

  const { data } = useQuery(billboard.query.getStoreByRefId(teamId));
  const { mutate } = useMutation(billboard.mutation.create());

  return (
    <div>
      <p>Billboards</p>
      <button
        onClick={() => {
          mutate({
            imageUrl: 'image-url',
            label: 'test label',
            storeId: teamId,
          });
        }}
      >
        Create new
      </button>
      <p>{JSON.stringify(data)}</p>
    </div>
  );
}
