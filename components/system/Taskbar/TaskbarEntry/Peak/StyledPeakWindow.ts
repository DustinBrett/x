import styled from 'styled-components';

const StyledPeakWindow = styled.div`
  background-color: ${({ theme }) => theme.colors.taskbar.hover};
  border: ${({ theme }) => `1px solid ${theme.colors.taskbar.background}`};
  border-bottom: 0;
  bottom: ${({ theme }) => theme.sizes.taskbar.height};
  display: flex;
  place-content: center;
  place-items: flex-start;
  position: absolute;
  width: 150px;

  img {
    padding: 8px;
    width: 100%;
  }
`;

export default StyledPeakWindow;
