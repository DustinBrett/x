import { extensions } from 'components/system/Files/FileEntry/functions';
import useFile from 'components/system/Files/FileEntry/useFile';
import type { MenuItem } from 'contexts/menu/useMenuContextState';
import processDirectory from 'contexts/process/directory';
import { extname } from 'path';

const useContextMenu = (
  url: string,
  pid: string,
  deleteFile: () => void,
  renameFile: () => void
): MenuItem[] => {
  const { process: [, ...openWith] = [] } = extensions[extname(url)] || {};
  const { icon: pidIcon } = processDirectory[pid] || {};
  const openFile = useFile(url);
  const menuItems: MenuItem[] = [
    { label: 'Delete', action: deleteFile },
    { label: 'Rename', action: renameFile }
  ];

  if (pid) {
    const openWithEntries = openWith.map((id) => {
      const { icon, title: label } = processDirectory[id] || {};
      const action = () => openFile(id);

      return { icon, label, action };
    });

    menuItems.unshift(
      {
        icon: pidIcon,
        label: 'Open',
        primary: true,
        action: () => openFile(pid)
      },
      ...openWithEntries,
      { separator: 1 }
    );
  }

  return menuItems;
};

export default useContextMenu;
