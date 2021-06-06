import styled from 'styled-components';

const StyledSidebar = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  li {
    height: 48px;
    margin-right: 7px;
    width: 48px;

    &:hover {
      background-color: hsla(0, 0%, 35%, 70%);
      border: 1px solid hsla(0, 0%, 45%, 70%);
    }
  }
`;

export default StyledSidebar;
