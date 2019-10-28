import styled, { css } from 'styled-components';
import MarginSetter from '../../utils/marginSetter';
import { IStyledTextProps, ITextIconProps } from './text-icon';

const StyledTextIcon = styled.div<ITextIconProps>`
  ${props => {
    const {
      theme: { colors },
      color,
      margin,
      backgroundColor,
      spacing,
      clickable,
    } = props;

    // change margins to ones passed in props
    let marginSize = '0px';
    if (margin) {
      marginSize = MarginSetter(margin);
    }

    return css`
      & > *:first-child {
        margin-right: ${spacing ? spacing : '10px'};
      }
      background-color: ${backgroundColor ? backgroundColor : ''};
      color: ${color ? color : colors.dark};
      ${marginSize}
      ${clickable
        ? `&: hover {
          cursor: pointer;
          color: ${props.theme.colors.accent};
          & * {
            stroke: ${props.theme.colors.accent};
            }
          }`
        : ''};
    `;
  }};
  display: flex;
  align-items: center;
  flex-direction: row;
`;

const StyledText = styled.div<IStyledTextProps>`
  ${props =>
    css`
      font-weight: ${props.bold
        ? props.theme.shapes.fontWeight.bold
        : props.theme.shapes.fontWeight.regular};
    `}
`;

export { StyledTextIcon, StyledText };