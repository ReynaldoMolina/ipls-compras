'use client';

import { useSearchParams, useRouter } from 'next/navigation';

export function useUpdateUrlParams() {
  const searchParams = useSearchParams();
  const router = useRouter();

  function setUrlParams(key: string, value: string | undefined) {
    const params = new URLSearchParams(searchParams.toString());

    if (value === undefined || value === '') {
      params.delete(key); // remove param if value is empty
    } else {
      params.set(key, value); // set or update param
    }

    // replace current URL with updated params
    router.replace(`?${params.toString()}`);
  }

  return setUrlParams;
}
