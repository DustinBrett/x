import { useProcesses } from 'contexts/process';
import { useSession } from 'contexts/session';
import { useCallback, useEffect, useMemo } from 'react';

type Focusable = {
  onBlur: React.FocusEventHandler;
  onFocus: React.FocusEventHandler;
  tabIndex: number;
  zIndex: number;
};

const useFocusable = (
  id: string,
  windowRef: React.MutableRefObject<HTMLElement | null>
): Focusable => {
  const { foregroundId, prependToStack, setForegroundId, stackOrder } =
    useSession();
  const {
    processes: { [id]: { minimized = false, taskbarEntry = undefined } = {} }
  } = useProcesses();
  const zIndex =
    stackOrder.length + (minimized ? 1 : -stackOrder.indexOf(id)) + 1;
  const isForeground = useMemo(() => id === foregroundId, [foregroundId, id]);
  const onBlur: React.FocusEventHandler = ({ relatedTarget }) => {
    if (isForeground && relatedTarget !== taskbarEntry) setForegroundId('');
  };
  const moveToFront = useCallback(
    ({ relatedTarget } = {}) => {
      if (windowRef.current?.contains(document.activeElement)) {
        prependToStack(id);
        setForegroundId(id);
      } else if (!relatedTarget || document.activeElement === taskbarEntry) {
        windowRef.current?.focus();
      }
    },
    [id, prependToStack, setForegroundId, taskbarEntry, windowRef]
  );

  useEffect(() => {
    if (isForeground) moveToFront();
  }, [isForeground, moveToFront]);

  useEffect(moveToFront, [moveToFront]);

  return {
    onBlur,
    onFocus: moveToFront,
    tabIndex: -1,
    zIndex
  };
};

export default useFocusable;
