import { useEffect } from 'react';

export function useMenuClose(
  menuRef: React.RefObject<HTMLElement | null>,
  buttonRef: React.RefObject<HTMLElement | null>,
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>
) {
  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
      }
    }

    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [menuRef, buttonRef, setIsMenuOpen]);
}
