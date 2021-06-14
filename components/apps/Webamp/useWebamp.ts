import {
  closeEqualizer,
  getWebampElement,
  updateWebampPosition
} from 'components/apps/Webamp/functions';
import type { Track, WebampCI } from 'components/apps/Webamp/types';
import useWindowActions from 'components/system/Window/Titlebar/useWindowActions';
import { useSession } from 'contexts/session';
import type { IAudioMetadata } from 'music-metadata-browser';
import { parseBuffer } from 'music-metadata-browser';
import { useState } from 'react';
import { useTheme } from 'styled-components';
import { WINDOW_TRANSITION_DURATION_IN_MILLISECONDS } from 'utils/constants';
import { bufferToBlob } from 'utils/functions';

type Webamp = {
  loadWebamp: (
    containerElement: HTMLDivElement | null,
    fileName: string,
    file?: Buffer
  ) => void;
  webampCI: WebampCI | null;
};

const useWebamp = (id: string): Webamp => {
  const { onClose, onMinimize } = useWindowActions(id);
  const {
    setWindowStates,
    windowStates: { [id]: { position = undefined } = {} } = {}
  } = useSession();
  const {
    sizes: {
      taskbar: { height: taskbarHeight }
    }
  } = useTheme();
  const [webampCI, setWebampCI] = useState<WebampCI | null>(null);
  const loadWebamp = (
    containerElement: HTMLDivElement | null,
    fileName: string,
    file?: Buffer
  ): void => {
    if (containerElement && window.Webamp && !webampCI) {
      const runWebamp = (initialTracks: Track[] = []) => {
        const webamp: WebampCI = new window.Webamp({ initialTracks });
        const subscriptions = [
          webamp.onWillClose((cancel) => {
            cancel();

            const [main] = getWebampElement().getElementsByClassName('window');
            const { x, y } = main.getBoundingClientRect();

            onClose();
            setWindowStates((currentWindowStates) => ({
              ...currentWindowStates,
              [id]: {
                position: { x, y }
              }
            }));

            setTimeout(() => {
              subscriptions.forEach((unsubscribe) => unsubscribe());
              webamp.close();
            }, WINDOW_TRANSITION_DURATION_IN_MILLISECONDS);
          }),
          webamp.onMinimize(() => onMinimize())
        ];

        webamp.renderWhenReady(containerElement).then(() => {
          closeEqualizer(webamp);
          updateWebampPosition(webamp, taskbarHeight, position);
          containerElement.appendChild(getWebampElement());
        });

        setWebampCI(webamp);
      };

      if (file) {
        parseBuffer(file).then(
          ({
            common: { artist = '', title = fileName },
            format: { duration = 0 }
          }: IAudioMetadata) =>
            runWebamp([
              {
                blob: bufferToBlob(file),
                duration: Math.floor(duration),
                metaData: { artist, title }
              }
            ])
        );
      } else {
        runWebamp();
      }
    }
  };

  return {
    loadWebamp,
    webampCI
  };
};

export default useWebamp;
