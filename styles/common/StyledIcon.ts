import { basename, dirname } from "path";
import styled from "styled-components";
import type { IconProps } from "styles/common/Icon";

const onLoad: React.ReactEventHandler = ({ target }) =>
  (target as HTMLImageElement).style.setProperty("visibility", "visible");

const StyledIcon = styled.img.attrs<IconProps>(
  ({ imgSize, displaySize, src = "" }) => ({
    draggable: false,
    height: `${displaySize || imgSize}px`,
    onLoad,
    src:
      !src || src.startsWith("blob:")
        ? src
        : `${dirname(src)}/${imgSize}x${imgSize}/${basename(src)}`,
    width: `${displaySize || imgSize}px`,
  })
)<IconProps>`
  visibility: hidden;
`;

export default StyledIcon;
