import { useEffect } from 'react';

export function useHideOnScroll(onClose: () => void) {
  useEffect(() => {
    function handleScroll() {
      onClose();
    }
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [onClose]);
}
