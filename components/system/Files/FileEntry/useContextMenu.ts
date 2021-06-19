import { extensions } from 'components/system/Files/FileEntry/functions';
import useFile from 'components/system/Files/FileEntry/useFile';
import type { MenuItem } from 'contexts/menu/useMenuContextState';
import { useProcesses } from 'contexts/process';
import processDirectory from 'contexts/process/directory';
import { dirname, extname } from 'path';

const useContextMenu = (
  url: string,
  pid: string,
  isShortcut: boolean,
  deleteFile: () => void,
  renameFile: () => void
): MenuItem[] => {
  const { open } = useProcesses();
  const { process: [, ...openWith] = [] } = extensions[extname(url)] || {};
  const { icon: pidIcon } = processDirectory[pid] || {};
  const openFile = useFile(url);
  const menuItems: MenuItem[] = [
    { label: 'Delete', action: deleteFile },
    { label: 'Rename', action: renameFile }
  ];

  if (pid) {
    menuItems.unshift({ separator: 1 });

    if (isShortcut && url && url !== '/') {
      menuItems.unshift({
        label: 'Open file location',
        action: () => open('FileExplorer', dirname(url))
      });
    } else if (openWith.length) {
      menuItems.unshift({
        label: 'Open with',
        menu: openWith.map((id): MenuItem => {
          const { icon, title: label } = processDirectory[id] || {};
          const action = () => openFile(id);

          return { icon, label, action };
        })
      });
    }

    menuItems.unshift({
      icon: pidIcon,
      label: 'Open',
      primary: true,
      action: () => openFile(pid)
    });
  }

  return menuItems;
};

export default useContextMenu;
