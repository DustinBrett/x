import {
  focusWindow,
  parseTrack,
  unFocus
} from 'components/apps/Webamp/functions';
import StyledWebamp from 'components/apps/Webamp/StyledWebamp';
import useWebamp from 'components/apps/Webamp/useWebamp';
import type { ComponentProcessProps } from 'components/system/Apps/RenderComponent';
import useFocusable from 'components/system/Window/useFocusable';
import useWindowTransitions from 'components/system/Window/useWindowTransitions';
import { useFileSystem } from 'contexts/fileSystem';
import { useProcesses } from 'contexts/process';
import { basename } from 'path';
import { useEffect, useMemo, useRef, useState } from 'react';
import { loadFiles } from 'utils/functions';

const Webamp = ({ id }: ComponentProcessProps): JSX.Element => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { fs } = useFileSystem();
  const { processes: { [id]: { url = '' } = {} } = {} } = useProcesses();
  const [currentUrl, setCurrentUrl] = useState(url);
  const { loadWebamp, webampCI } = useWebamp(id);
  const windowTransitions = useWindowTransitions(id, containerRef);
  const focusEvents = useMemo(
    () => ({
      onBlur: () => webampCI && unFocus(webampCI),
      onFocus: () => webampCI && focusWindow(webampCI, 'main')
    }),
    [webampCI]
  );
  const { zIndex, ...focusableProps } = useFocusable(
    id,
    containerRef,
    focusEvents
  );

  useEffect(() => {
    if (fs) {
      fs?.readFile(url, (_error, contents) => {
        loadFiles(['/libs/webamp/webamp.bundle.min.js']).then(() =>
          loadWebamp(containerRef?.current, basename(url), contents)
        );
      });
    }
  }, [containerRef, fs, loadWebamp, url]);

  useEffect(() => {
    if (url && url !== currentUrl && webampCI) {
      fs?.readFile(url, (_error, contents = Buffer.from('')) => {
        parseTrack(contents, basename(url)).then((track) => {
          setCurrentUrl(url);
          webampCI?.appendTracks([track]);
        });
      });
    }
  }, [currentUrl, fs, url, webampCI]);

  return (
    <StyledWebamp
      ref={containerRef}
      style={{ zIndex }}
      {...focusableProps}
      {...windowTransitions}
    />
  );
};

export default Webamp;
