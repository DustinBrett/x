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
  const { x = 0, y = 0 } = position || {};
  const { height = 0, width = 0 } = size || {};
  const onMouseMove: React.MouseEventHandler<HTMLElement> = ({
    pageX,
    pageY
  }) => setSize({ width: pageX - x, height: pageY - y });
  const onMouseDown: React.MouseEventHandler<HTMLElement> = ({
    target,
    pageX,
    pageY
  }) => {
    if (target === containerRef?.current) setPosition({ x: pageX, y: pageY });
  };
  const resetSelection = () => {
    setSize(null);
    setPosition(null);
  };

  return {
    selectionStyling: position
      ? {
          height: `${Math.abs(Number(height))}px`,
          width: `${Math.abs(Number(width))}px`,
          left: `${x + (Number(width) < 0 ? Number(width) : 0)}px`,
          top: `${y + (Number(height) < 0 ? Number(height) : 0)}px`
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
