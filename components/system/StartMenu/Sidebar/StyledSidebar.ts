import styled from 'styled-components';

const StyledSidebar = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-top: 4px;

  li {
    border: 1px solid transparent;
    display: flex;
    height: 48px;
    margin-right: 7px;
    place-content: center;
    place-items: center;
    width: 48px;

    figure {
      svg {
        fill: #fff;
        height: 16px;
        margin-left: 1px;
        width: 16px;
      }

      figcaption {
        display: none;
      }
    }

    &:hover {
      background-color: hsla(0, 0%, 35%, 70%);
      border: 1px solid hsla(0, 0%, 45%, 70%);
    }
  }
`;

export default StyledSidebar;
