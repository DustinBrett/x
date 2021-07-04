import { memo, useEffect } from "react";
import type { IconProps } from "styles/common/StyledIcon";
import StyledIcon from "styles/common/StyledIcon";
import { cleanUpBufferUrl } from "utils/functions";

const Icon = (
  props: React.ImgHTMLAttributes<HTMLImageElement> & IconProps
): JSX.Element => {
  useEffect(
    () => () => {
      if (props?.src?.startsWith("blob:")) cleanUpBufferUrl(props?.src);
    },
    [props]
  );

  return <StyledIcon {...props} />;
};

export default memo(Icon);
