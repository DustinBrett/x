import { useProcesses } from 'contexts/process';
import { createPid } from 'contexts/process/functions';
import { useSession } from 'contexts/session';

type OpenFile = () => void;

const useFile = (url: string, pid: string): OpenFile => {
  const { setForegroundId } = useSession();
  const { minimize, open, processes } = useProcesses();

  return () => {
    const id = createPid(pid, url);

    if (processes[id]) {
      if (processes[id].minimized) minimize(id);
      setForegroundId(id);
    } else {
      open(pid, url);
    }
  };
};

export default useFile;
