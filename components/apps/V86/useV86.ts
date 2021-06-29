import {
  BOOT_CD_FD_HD,
  BOOT_FD_CD_HD,
  config,
  libs,
} from "components/apps/V86/config";
import type { V86ImageConfig } from "components/apps/V86/image";
import { getImageType } from "components/apps/V86/image";
import type { V86, V86Starter } from "components/apps/V86/types";
import useTitle from "components/system/Window/useTitle";
import { useFileSystem } from "contexts/fileSystem";
import { extname } from "path";
import { useEffect, useState } from "react";
import { bufferToUrl, cleanUpBufferUrl, loadFiles } from "utils/functions";

const useV86 = (
  id: string,
  url: string,
  screenContainer: React.MutableRefObject<HTMLDivElement | null>
): V86 => {
  const { appendFileToTitle } = useTitle(id);
  const [emulator, setEmulator] = useState<V86Starter>();
  const { fs } = useFileSystem();

  useEffect(() => {
    if (!emulator && fs && url) {
      fs?.readFile(url, (_error, contents = Buffer.from("")) => {
        loadFiles(libs).then(() => {
          if (screenContainer?.current) {
            const isISO = extname(url).toLowerCase() === ".iso";
            const bufferUrl = bufferToUrl(contents);
            const v86ImageConfig: V86ImageConfig = {
              [isISO ? "cdrom" : getImageType(contents.length)]: {
                async: false,
                size: contents.length,
                url: bufferUrl,
                use_parts: false,
              },
            };
            const v86 = new window.V86Starter({
              boot_order: isISO ? BOOT_CD_FD_HD : BOOT_FD_CD_HD,
              screen_container: screenContainer.current,
              ...v86ImageConfig,
              ...config,
            });

            v86.add_listener("emulator-loaded", () => {
              appendFileToTitle(url);
              cleanUpBufferUrl(bufferUrl);
            });

            setEmulator(v86);
          }
        });
      });
    }

    return () => emulator?.destroy?.();
  }, [appendFileToTitle, emulator, fs, screenContainer, url]);

  return {
    emulator,
    lockMouse: emulator?.lock_mouse,
  };
};

export default useV86;
