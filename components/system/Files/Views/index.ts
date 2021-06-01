import StyledIconFileEntry from 'components/system/Files/Views/Icon/StyledFileEntry';
import StyledIconFileManager from 'components/system/Files/Views/Icon/StyledFileManager';
import type { DefaultTheme, StyledComponent } from 'styled-components';

type FileManagerView = {
  StyledFileEntry: StyledComponent<'li', DefaultTheme>;
  StyledFileManager: StyledComponent<'ol', DefaultTheme>;
};

export type FileManagerViewNames = 'icon'; // TODO: 'list' | 'menu'

const FileManagerViews: Record<FileManagerViewNames, FileManagerView> = {
  icon: {
    StyledFileEntry: StyledIconFileEntry,
    StyledFileManager: StyledIconFileManager
  }
};

export default FileManagerViews;
