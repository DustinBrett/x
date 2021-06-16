import styled from 'styled-components';

const StyledFileManager = styled.ol`
  left: ${({ theme }) =>
    `calc(${theme.sizes.startMenu.sidebarButtonWidth} + ${theme.sizes.startMenu.componentPadding})`};
  margin-left: ${({ theme }) => theme.sizes.startMenu.componentPadding};
  margin-top: ${({ theme }) => theme.sizes.startMenu.componentPadding};
  position: absolute;
  width: ${({ theme }) =>
    `calc(100% - ${theme.sizes.startMenu.sidebarButtonWidth} - (${theme.sizes.startMenu.componentPadding} * 2))`};
`;

export default StyledFileManager;
