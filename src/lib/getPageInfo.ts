import { PageId } from '@/types/types';
import { menuOptions, MenuOption } from '@/ui/sidemenu/menuOptions';

const defaultInfo: MenuOption = {
  id: 'empty',
  name: '(Sin título)',
  url: '',
};

export function getPageInfo(pageId: PageId) {
  const page = menuOptions.find((option) => option.id === pageId);
  return page || defaultInfo;
}
