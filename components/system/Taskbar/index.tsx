import Clock from "components/system/Taskbar/Clock";
import StartButton from "components/system/Taskbar/StartButton";
import StyledTaskbar from "components/system/Taskbar/StyledTaskbar";
import TaskbarEntries from "components/system/Taskbar/TaskbarEntries";
import { useSession } from "contexts/session";
import { AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";

const StartMenu = dynamic(() => import("components/system/StartMenu"));

const Taskbar = (): JSX.Element => {
  const { startMenuVisible } = useSession();

  return (
    <>
      {startMenuVisible && (
        <AnimatePresence>
          <StartMenu />
        </AnimatePresence>
      )}
      <StyledTaskbar tabIndex={-1}>
        <StartButton />
        <TaskbarEntries />
        <Clock />
      </StyledTaskbar>
    </>
  );
};

export default Taskbar;
