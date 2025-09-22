import { SidebarItem } from '@/components/app-sidebar';

export function getActiveSidebarOption(pathname: string, items: SidebarItem[]) {
  const segments = pathname.split('/').filter(Boolean);
  // Look for the longest match (deepest in the path)
  const match = items.findLast((item) =>
    segments.includes(item.url.replace('/', ''))
  );
  return match?.url;
}
