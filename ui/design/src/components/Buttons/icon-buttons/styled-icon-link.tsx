import { Anchor } from 'grommet';
import styled, { css } from 'styled-components';
import { ILinkIconButtonProps } from './icon-link';

const StyledIconLink = styled(Anchor)<ILinkIconButtonProps>`
  border-radius: ${props => props.theme.shapes.largeBorderRadius};
  border: none;
  font-weight: 400;
  ${props => {
    if (props.active) {
      return css`
        color: ${props.theme.colors.accent};
      `;
    }
    return css`
      color: ${props.theme.colors.secondaryText};
    `;
  }}
  ${props => {
    if (props.padded) {
      return css`
        padding: 0 0.8rem;
      `;
    }
    return;
  }}
  &:hover {
    text-decoration: none;
    color: ${props => props.theme.colors.accent};
    svg {
      & * {
        stroke: ${props => props.theme.colors.accent};
      }
    }
  }
  svg {
    height: 100%;
    width: 1.25rem;
    stroke: ${props => props.theme.colors.lightGrey};
    & * {
      stroke: ${props => props.theme.colors.secondaryText};
    }
  }
`;

export default StyledIconLink;