import { useCallback, useRef } from 'react';
import { DOUBLE_CLICK_TIMEOUT_IN_MILLISECONDS } from 'utils/constants';

type DoubleClick = (
  handler: React.MouseEventHandler,
  singleClick: boolean,
  timeout?: number
) => React.MouseEventHandler;

const useDoubleClick: DoubleClick = (
  handler,
  singleClick = false,
  timeout = DOUBLE_CLICK_TIMEOUT_IN_MILLISECONDS
) => {
  const timer = useRef<NodeJS.Timeout | null>(null);
  const onClick = useCallback<React.MouseEventHandler>(
    (event) => {
      const runHandler = () => {
        event.stopPropagation();
        handler(event);
      };

      if (singleClick) {
        runHandler();
      } else if (!timer.current) {
        timer.current = setTimeout(() => {
          timer.current = null;
        }, timeout);
      } else {
        clearTimeout(timer.current);
        runHandler();
        timer.current = null;
      }
    },
    [handler, singleClick, timeout]
  );

  return onClick;
};

export default useDoubleClick;
