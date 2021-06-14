import type { Position } from 'react-rnd';

type WebampDispatchOptionalProps = {
  positions?: {
    main: Position;
    playlist: Position;
  };
  windowId?: string;
  window?: string;
};

type WebampDispatch = WebampDispatchOptionalProps & {
  type: string;
};

export type WebampCI = {
  close: () => void;
  dispose: () => void;
  onWillClose: (cb: (cancel: () => void) => void) => () => void;
  onMinimize: (cb: () => void) => () => void;
  renderWhenReady: (domNode: HTMLElement) => Promise<void>;
  store: {
    dispatch: (command: WebampDispatch) => void;
  };
};

export type Track = {
  blob: Blob;
  duration: number;
  metaData: {
    artist?: string;
    title: string;
  };
};

type WebampOptions = {
  initialTracks?: Track[];
};

interface WebampConstructor {
  new (options?: WebampOptions): WebampCI;
}

declare global {
  interface Window {
    Webamp: WebampConstructor;
  }
}
