import styled from 'styled-components';

const StyledSelection = styled.div`
  background-color: hsl(207deg 100% 72% / 30%);
  border: ${({ theme }) => `1px solid ${theme.colors.highlight}`};
  position: absolute;
`;

export default StyledSelection;
