import { useCallback, useRef } from 'react';
import { DOUBLE_CLICK_TIMEOUT_IN_MILLISECONDS } from 'utils/constants';

type DoubleClick = (
  handler: React.MouseEventHandler,
  timeout?: number
) => React.MouseEventHandler;

const useDoubleClick: DoubleClick = (
  handler,
  timeout = DOUBLE_CLICK_TIMEOUT_IN_MILLISECONDS
) => {
  const timer = useRef<NodeJS.Timeout | null>(null);
  const onClick = useCallback<React.MouseEventHandler>(
    (event) => {
      if (!timer.current) {
        timer.current = setTimeout(() => {
          timer.current = null;
        }, timeout);
      } else {
        clearTimeout(timer.current);
        event.stopPropagation();
        handler(event);
        timer.current = null;
      }
    },
    [handler, timeout]
  );

  return onClick;
};

export default useDoubleClick;
