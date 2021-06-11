import StyledSelection from 'components/system/Files/FileManager/Selection/StyledSelection';
import type { Size } from 'components/system/Window/RndWindow/useResizable';
import { useState } from 'react';
import type { Position } from 'react-rnd';

type Selection = {
  SelectionComponent?: React.ComponentType;
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
  const { x, y } = position || {};
  const { height, width } = size || {};
  const onMouseMove: React.MouseEventHandler<HTMLElement> = ({
    pageX,
    pageY
  }) => setSize({ width: pageX - (x || 0), height: pageY - (y || 0) });
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
  const style =
    typeof height === 'number' &&
    typeof width === 'number' &&
    typeof x === 'number' &&
    typeof y === 'number'
      ? {
          height: `${Math.abs(height)}px`,
          width: `${Math.abs(width)}px`,
          transform: `translate(
            ${x + (width < 0 ? width : 0)}px,
            ${y + (height < 0 ? height : 0)}px)`
        }
      : undefined;
  const SelectionComponent = (): JSX.Element => (
    <StyledSelection style={style} />
  );

  return {
    SelectionComponent: style ? SelectionComponent : undefined,
    selectionEvents: {
      onMouseDown,
      onMouseMove: position ? onMouseMove : undefined,
      onMouseLeave: position ? resetSelection : undefined,
      onMouseUp: position ? resetSelection : undefined
    }
  };
};

export default useSelection;
