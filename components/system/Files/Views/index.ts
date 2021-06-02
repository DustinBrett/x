import StyledIconFileEntry from 'components/system/Files/Views/Icon/StyledFileEntry';
import StyledIconFileManager from 'components/system/Files/Views/Icon/StyledFileManager';
import StyledMenuFileEntry from 'components/system/Files/Views/Menu/StyledFileEntry';
import StyledMenuFileManager from 'components/system/Files/Views/Menu/StyledFileManager';
import type { DefaultTheme, StyledComponent } from 'styled-components';

type FileManagerView = {
  StyledFileEntry: StyledComponent<'li', DefaultTheme>;
  StyledFileManager: StyledComponent<'ol', DefaultTheme>;
};

export type FileManagerViewNames = 'icon' | 'menu'; // TODO: 'list' | 'menu'

const FileManagerViews: Record<FileManagerViewNames, FileManagerView> = {
  icon: {
    StyledFileEntry: StyledIconFileEntry,
    StyledFileManager: StyledIconFileManager
  },
  menu: {
    StyledFileEntry: StyledMenuFileEntry,
    StyledFileManager: StyledMenuFileManager
  }
};

export default FileManagerViews;
