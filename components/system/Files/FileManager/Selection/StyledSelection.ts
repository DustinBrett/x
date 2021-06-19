import styled from 'styled-components';

const StyledSelection = styled.span`
  background-color: hsl(207deg 100% 72% / 30%);
  border: ${({ theme }) => `1px solid ${theme.colors.highlight}`};
  position: absolute;
  z-index: 1;
`;

export default StyledSelection;
