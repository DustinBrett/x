import FileEntry from 'components/system/Files/FileEntry';
import useSelection from 'components/system/Files/FileManager/Selection/useSelection';
import useFileDrop from 'components/system/Files/FileManager/useFileDrop';
import useFiles from 'components/system/Files/FileManager/useFiles';
import type { FileManagerViewNames } from 'components/system/Files/Views';
import { FileManagerViews } from 'components/system/Files/Views';
import { useFileSystem } from 'contexts/fileSystem';
import { basename, extname, resolve } from 'path';
import { useEffect, useRef } from 'react';
import { MOUNTABLE_EXTENSIONS, SHORTCUT_EXTENSION } from 'utils/constants';

type FileManagerProps = {
  url: string;
  view: FileManagerViewNames;
};

const FileManager = ({ url, view }: FileManagerProps): JSX.Element => {
  const { deleteFile, files, renameFile, updateFiles } = useFiles(url);
  const { mountFs, unMountFs } = useFileSystem();
  const { StyledFileEntry, StyledFileManager } = FileManagerViews[view];
  const containerRef = useRef<HTMLOListElement | null>(null);
  const { SelectionComponent, selectionEvents } = useSelection(containerRef);

  useEffect(() => {
    const isMountable = MOUNTABLE_EXTENSIONS.includes(extname(url));

    if (isMountable && !files.length) mountFs(url, updateFiles);

    return () => {
      if (isMountable && files.length) unMountFs(url);
    };
  }, [files, mountFs, unMountFs, updateFiles, url]);

  return (
    <>
      <StyledFileManager
        ref={containerRef}
        selecting={!!SelectionComponent}
        {...selectionEvents}
        {...useFileDrop(url, updateFiles)}
      >
        {SelectionComponent && <SelectionComponent />}
        {files.map((file) => (
          <StyledFileEntry key={file}>
            <FileEntry
              deleteFile={deleteFile}
              name={basename(file, SHORTCUT_EXTENSION)}
              path={resolve(url, file)}
              renameFile={renameFile}
              view={view}
            />
          </StyledFileEntry>
        ))}
      </StyledFileManager>
    </>
  );
};

export default FileManager;
