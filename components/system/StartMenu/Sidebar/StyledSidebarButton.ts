import styled from 'styled-components';

type StyledSidebarButtonProps = {
  active?: boolean;
  heading?: boolean;
};

const StyledSidebarButton = styled.li<StyledSidebarButtonProps>`
  border: 1px solid transparent;
  display: flex;
  height: ${({ theme }) => theme.sizes.startMenu.sidebarButtonWidth};
  place-items: center;
  width: ${({ theme }) => theme.sizes.startMenu.sidebarButtonWidth};

  &::before {
    border-left: ${({ active, theme }) =>
      `4px solid ${active ? theme.colors.highlight : 'transparent'}`};
    content: '';
    height: ${({ theme }) => theme.sizes.startMenu.sidebarButtonWidth};
    position: absolute;
    width: ${({ theme }) => theme.sizes.startMenu.sidebarButtonWidth};
  }

  figure {
    color: ${({ active, theme }) =>
      active ? theme.colors.highlight : theme.colors.text};
    display: flex;
    place-items: center;

    svg {
      fill: ${({ active, theme }) =>
        active ? theme.colors.highlight : theme.colors.text};
      height: 16px;
      left: 16px;
      margin-bottom: -1px;
      margin-left: 1px;
      position: absolute;
      width: 16px;
    }

    figcaption {
      font-weight: ${({ heading }) => heading && '600'};
      left: ${({ theme }) =>
        `calc(${theme.sizes.startMenu.sidebarButtonWidth} + 1px)`};
      position: absolute;
      visibility: hidden;
      white-space: nowrap;
    }
  }

  &:hover {
    background-color: hsla(0, 0%, 35%, 70%);
    border: 1px solid hsla(0, 0%, 45%, 70%);
  }
`;

export default StyledSidebarButton;
