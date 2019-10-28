import { Box, Drop } from 'grommet';
import styled from 'styled-components';

const StyledSelectBox = styled(Box)`
  ${props =>
    `&:hover {
        background-color: ${props.theme.colors.lightBackground};
        cursor: pointer;
      }
    `}
`;

const StyledDrop = styled(Drop)`
  margin-top: 5px;
  border-radius: ${props => props.theme.shapes.largeBorderRadius};
`;

export { StyledSelectBox, StyledDrop };