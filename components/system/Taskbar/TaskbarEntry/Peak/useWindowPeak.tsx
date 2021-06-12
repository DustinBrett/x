import StyledPeakWindow from 'components/system/Taskbar/TaskbarEntry/Peak/StyledPeakWindow';
import { useProcesses } from 'contexts/process';
import { toPng } from 'html-to-image';
import { useCallback, useEffect, useRef, useState } from 'react';

type WindowPeak = {
  PeakComponent?: React.ComponentType;
  peakEvents: {
    onMouseEnter: () => void;
    onMouseLeave: () => void;
  };
};

const useWindowPeak = (id: string): WindowPeak => {
  const {
    processes: { [id]: { componentWindow = undefined, title = '' } = {} }
  } = useProcesses();
  const mouseTimer = useRef<NodeJS.Timer | null>(null);
  const previewTimer = useRef<NodeJS.Timer | null>(null);
  const [showPeak, setShowPeak] = useState(false);
  const [previewSrc, setPreviewSrc] = useState('');
  const PeakWindow = (): JSX.Element => (
    <StyledPeakWindow>
      <img alt={title} src={previewSrc} />
    </StyledPeakWindow>
  );
  const onMouseEnter = () => {
    if (componentWindow) {
      const renderFrame = () =>
        toPng(componentWindow).then((dataUrl) => {
          const previewImage = new Image();

          previewImage.src = dataUrl;
          previewImage.onload = () => setPreviewSrc(dataUrl);
        });

      mouseTimer.current = setTimeout(() => {
        renderFrame();
        setShowPeak(true);
        previewTimer.current = setInterval(renderFrame, 1000);
      }, 250);
    }
  };
  const onMouseLeave = useCallback(() => {
    if (mouseTimer?.current) clearTimeout(mouseTimer.current);
    if (previewTimer?.current) clearInterval(previewTimer.current);

    setShowPeak(false);
    setPreviewSrc('');
  }, []);

  useEffect(() => onMouseLeave, [onMouseLeave]);

  return {
    PeakComponent: showPeak && previewSrc ? PeakWindow : undefined,
    peakEvents: {
      onMouseEnter,
      onMouseLeave
    }
  };
};

export default useWindowPeak;
