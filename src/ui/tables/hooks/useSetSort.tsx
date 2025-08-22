'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { LabelType } from '../components/headerLabels';
import { SortOrder } from '@/types/types';

export function useSortParams() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const orderBy = (searchParams.get('orderBy') as LabelType) ?? 'id';
  const direction = (searchParams.get('direction') as SortOrder) ?? 'asc';

  function setSort(column: LabelType) {
    let newDirection: SortOrder = 'asc';

    if (orderBy === column) {
      // toggle direction
      newDirection = direction === 'asc' ? 'desc' : 'asc';
    }

    const params = new URLSearchParams(searchParams);
    params.set('orderBy', column);
    params.set('direction', newDirection);

    router.replace(`?${params.toString()}`);
  }

  return { orderBy, direction, setSort };
}
