import useWindowPeek from "components/system/Taskbar/TaskbarEntry/Peek/useWindowPeek";
import StyledTaskbarEntry from "components/system/Taskbar/TaskbarEntry/StyledTaskbarEntry";
import useTaskbarTransition from "components/system/Taskbar/TaskbarEntry/useTaskbarTransition";
import useNextFocusable from "components/system/Window/useNextFocusable";
import { useProcesses } from "contexts/process";
import { useSession } from "contexts/session";
import { useCallback } from "react";
import Button from "styles/common/Button";
import Icon from "styles/common/Icon";

type TaskbarEntryProps = {
  icon: string;
  id: string;
  title: string;
};

const TaskbarEntry = ({ icon, id, title }: TaskbarEntryProps): JSX.Element => {
  const nextFocusableId = useNextFocusable(id);
  const { foregroundId, setForegroundId } = useSession();
  const isForeground = id === foregroundId;
  const {
    linkElement,
    minimize,
    processes: { [id]: { minimized = false } = {} },
  } = useProcesses();
  const linkTaskbarEntry = useCallback(
    (taskbarEntry: HTMLButtonElement) =>
      taskbarEntry && linkElement(id, "taskbarEntry", taskbarEntry),
    [id, linkElement]
  );
  const onClick = () => {
    if (minimized || isForeground) {
      minimize(id);
    }

    setForegroundId(isForeground ? nextFocusableId : id);
  };
  const { PeekComponent, peekEvents } = useWindowPeek(id);

  return (
    <StyledTaskbarEntry
      foreground={isForeground}
      title={title}
      {...peekEvents}
      {...useTaskbarTransition()}
    >
      {PeekComponent && <PeekComponent />}
      <Button onClick={onClick} ref={linkTaskbarEntry}>
        <figure>
          <Icon src={icon} alt={title} imgSize={16} />
          <figcaption>{title}</figcaption>
        </figure>
      </Button>
    </StyledTaskbarEntry>
  );
};

export default TaskbarEntry;
