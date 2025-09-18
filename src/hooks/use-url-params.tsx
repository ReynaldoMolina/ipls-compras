import { useRouter, useSearchParams } from 'next/navigation';

export function useUrlParams() {
  const router = useRouter();
  const searchParams = useSearchParams();

  function updateUrl(params: URLSearchParams) {
    router.push(`?${params.toString()}`, { scroll: false });
  }

  function setCheckBoxParam(key: string, value: string | string[] | null) {
    const params = new URLSearchParams(searchParams.toString());

    if (value === null || (Array.isArray(value) && value.length === 0)) {
      params.delete(key);
    } else if (Array.isArray(value)) {
      params.set(key, value.join(','));
    } else {
      params.set(key, value);
    }

    updateUrl(params);
  }

  function setRadioParam(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    const current = params.get(key);

    if (current === value) {
      params.delete(key);
    } else {
      params.set(key, value);
    }

    updateUrl(params);
  }

  function getParam(key: string): string[] {
    const raw = searchParams.get(key);
    return raw ? raw.split(',') : [];
  }

  return { setCheckBoxParam, setRadioParam, getParam };
}

// Load saved filters from localStorage when no params are present
// useEffect(() => {
//   if (searchParams.toString()) return;

//   const saved = localStorage.getItem(`filters:${pageKey}`);
//   if (saved) {
//     router.replace(`?${saved}`, { scroll: false });
//   }
// }, [searchParams, router, pageKey]);

// Persist to localStorage
// localStorage.setItem(`filters:${pageKey}`, query);
