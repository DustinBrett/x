import styled from 'styled-components';

const StyledSidebar = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-right: ${({ theme }) => theme.sizes.startMenu.componentPadding};
  padding-top: 4px;
  transition-duration: 200ms;
  width: 48px;
  z-index: 1;

  li figcaption {
    transition-duration: 20ms;
    visibility: hidden;
  }

  &:hover {
    backdrop-filter: blur(10px);
    box-shadow: 8px 0 5px -5px hsla(0, 0%, 10%, 50%);
    transition-delay: 400ms;
    transition-duration: 400ms;
    width: 220px;

    li {
      transition-delay: 400ms;
      transition-duration: 400ms;
      transition-property: width;
      width: 220px;

      figcaption {
        transition-delay: 400ms;
        transition-duration: 400ms;
        visibility: visible;
      }
    }
  }
`;

export default StyledSidebar;
