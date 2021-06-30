import { centerPosition } from "components/system/Window/functions";
import type { Size } from "components/system/Window/RndWindow/useResizable";
import { useSession } from "contexts/session";
import { useState } from "react";
import type { Position } from "react-rnd";
import { useTheme } from "styled-components";
import { DEFAULT_WINDOW_POSITION } from "utils/constants";

type Draggable = [Position, React.Dispatch<React.SetStateAction<Position>>];

const useDraggable = (id: string, size: Size): Draggable => {
  const {
    sizes: {
      taskbar: { height: taskbarHeight },
    },
  } = useTheme();
  const {
    windowStates: {
      [id]: {
        position = centerPosition(size, taskbarHeight) ||
          DEFAULT_WINDOW_POSITION,
      } = {},
    },
  } = useSession();
  const [{ x, y }, setPosition] = useState<Position>(position);

  return [{ x, y }, setPosition];
};

export default useDraggable;
