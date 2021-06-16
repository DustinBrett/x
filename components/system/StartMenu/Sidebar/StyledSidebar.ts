import styled from 'styled-components';

const StyledSidebar = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-right: ${({ theme }) => theme.sizes.startMenu.componentPadding};
  padding-top: 4px;

  &:hover {
    backdrop-filter: blur(10px);
    background-color: hsla(0, 0%, 15%, 80%);
    transition-delay: 375ms;
    transition-duration: 375ms;
    z-index: 1;

    li {
      transition-delay: 375ms;
      transition-duration: 375ms;
      transition-property: width;
      width: 220px;

      figcaption {
        transition-delay: 365ms;
        transition-duration: 365ms;
        visibility: visible;
      }
    }
  }
`;

export default StyledSidebar;
