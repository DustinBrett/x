import type { Size } from 'components/system/Window/RndWindow/useResizable';
import { useState } from 'react';
import type { Position } from 'react-rnd';

type Selection = {
  selectionStyling: React.CSSProperties;
  selectionEvents: {
    onMouseDown: React.MouseEventHandler<HTMLElement>;
    onMouseMove?: React.MouseEventHandler<HTMLElement>;
    onMouseLeave?: React.MouseEventHandler<HTMLElement>;
    onMouseUp?: () => void;
  };
};

const useSelection = (
  containerRef: React.MutableRefObject<HTMLElement | null>
): Selection => {
  const [position, setPosition] = useState<Position | null>(null);
  const [size, setSize] = useState<Size | null>(null);
  const onMouseMove: React.MouseEventHandler<HTMLElement> = ({
    pageX,
    pageY
  }) =>
    setSize({
      width: pageX - (position?.x || 0),
      height: pageY - (position?.y || 0)
    });
  const onMouseDown: React.MouseEventHandler<HTMLElement> = ({
    target,
    pageX: x,
    pageY: y
  }) => {
    if (target === containerRef?.current) {
      setPosition({ x, y });
    }
  };
  const resetSelection = () => {
    setSize(null);
    setPosition(null);
  };

  return {
    selectionStyling: position
      ? {
          height: `${Math.abs(Number(size?.height))}px`,
          width: position && `${Math.abs(Number(size?.width))}px`,
          left: `${
            (position?.x || 0) +
            (Number(size?.width) < 0 ? Number(size?.width) : 0)
          }px`,
          top: `${
            (position?.y || 0) +
            (Number(size?.height) < 0 ? Number(size?.height) : 0)
          }px`
        }
      : { display: 'none' },
    selectionEvents: {
      onMouseDown,
      onMouseMove: position ? onMouseMove : undefined,
      onMouseLeave: position ? resetSelection : undefined,
      onMouseUp: position ? resetSelection : undefined
    }
  };
};

export default useSelection;
