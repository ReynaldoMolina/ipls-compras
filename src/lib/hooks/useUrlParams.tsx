import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export function useUrlParams(pageKey: string) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Load saved filters from localStorage when no params are present
  useEffect(() => {
    if (searchParams.toString()) return;

    const saved = localStorage.getItem(`filters:${pageKey}`);
    if (saved) {
      router.replace(`?${saved}`, { scroll: false });
    }
  }, [searchParams, router, pageKey]);

  function setParam(key: string, value: string | string[] | null) {
    const params = new URLSearchParams(searchParams.toString());

    if (value === null || (Array.isArray(value) && value.length === 0)) {
      params.delete(key);
    } else if (Array.isArray(value)) {
      params.set(key, value.join(','));
    } else {
      params.set(key, value);
    }

    const query = params.toString();
    router.push(`?${query}`, { scroll: false });

    // Persist to localStorage
    localStorage.setItem(`filters:${pageKey}`, query);
  }

  function getParam(key: string): string[] {
    const raw = searchParams.get(key);
    return raw ? raw.split(',') : [];
  }

  return { setParam, getParam };
}
