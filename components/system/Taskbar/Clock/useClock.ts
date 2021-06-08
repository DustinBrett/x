import useSyncedClock from 'components/system/Taskbar/Clock/useSyncedClock';
import { useState } from 'react';

const useClock = (): Date => {
  const [now, setNow] = useState(new Date());
  const updateClock = () => setNow(new Date());

  useSyncedClock(updateClock);

  return now;
};

export default useClock;
