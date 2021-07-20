import classNames from 'classnames';
import React from 'react';
import styled, { css } from 'styled-components';
import CommonInterface from '../../interfaces/common.interface';
import * as icons from './new-icons';

export type IconType =
  | 'app3Box'
  | 'appCenter'
  | 'appAkasha'
  | 'appEns'
  | 'appFeed'
  | 'appIpfs'
  | 'activity'
  | 'akasha'
  | 'addAppGrey'
  | 'addCard'
  | 'announcement'
  | 'app'
  | 'arrowDown'
  | 'arrowUp'
  | 'arrowLeft'
  | 'arrowRight'
  | 'available'
  | 'bold'
  | 'book'
  | 'bookmark'
  | 'calendar'
  | 'comments'
  | 'close'
  | 'code'
  | 'coins'
  | 'copy'
  | 'check'
  | 'checkSimple'
  | 'discord'
  | 'document'
  | 'editSimple'
  | 'edit'
  | 'email'
  | 'emoji'
  | 'eye'
  | 'ethereum'
  | 'ethereumWorldLogo'
  | 'error'
  | 'facebook'
  | 'feedback'
  | 'following'
  | 'github'
  | 'hashtag'
  | 'heart'
  | 'home'
  | 'hotTopics'
  | 'image'
  | 'italic'
  | 'info'
  | 'legal'
  | 'link'
  | 'loading'
  | 'login'
  | 'media'
  | 'menuCollapsed'
  | 'menu'
  | 'menuPyramid'
  | 'metamask'
  | 'moreDark'
  | 'moreGrey'
  | 'notifications'
  | 'payment'
  | 'person'
  | 'pin'
  | 'plusDark'
  | 'plusGrey'
  | 'questionMark'
  | 'quote'
  | 'reddit'
  | 'reload'
  | 'reply'
  | 'report'
  | 'search'
  | 'send'
  | 'settings'
  | 'share'
  | 'signOut'
  | 'subscribe'
  | 'stopwatch'
  | 'shareSmallBlue'
  | 'shareSmallDark'
  | 'shareSmallGrey'
  | 'thumbsDownGrey'
  | 'thumbsDownWhite'
  | 'thumbsUpGrey'
  | 'thumbsUpWhite'
  | 'transfer'
  | 'trash'
  | 'trendingApps'
  | 'twitter'
  | 'underline'
  | 'upload'
  | 'video'
  | 'wallet'
  | 'walletconnect';

export const iconTypes: IconType[] = [
  'app3Box',
  'appAkasha',
  'appCenter',
  'appEns',
  'appFeed',
  'appIpfs',
  'activity',
  'addAppGrey',
  'akasha',
  'addCard',
  'announcement',
  'app',
  'arrowDown',
  'arrowUp',
  'arrowLeft',
  'arrowRight',
  'available',
  'bold',
  'book',
  'bookmark',
  'calendar',
  'comments',
  'close',
  'code',
  'copy',
  'check',
  'checkSimple',
  'coins',
  'discord',
  'document',
  'editSimple',
  'edit',
  'email',
  'emoji',
  'eye',
  'ethereum',
  'ethereumWorldLogo',
  'error',
  'facebook',
  'feedback',
  'following',
  'github',
  'hashtag',
  'heart',
  'home',
  'hotTopics',
  'image',
  'info',
  'italic',
  'legal',
  'link',
  'loading',
  'login',
  'media',
  'menuCollapsed',
  'menu',
  'menuPyramid',
  'metamask',
  'moreDark',
  'moreGrey',
  'notifications',
  'payment',
  'person',
  'pin',
  'plusDark',
  'questionMark',
  'quote',
  'reddit',
  'reload',
  'reply',
  'report',
  'search',
  'send',
  'settings',
  'signOut',
  'share',
  'subscribe',
  'stopwatch',
  'shareSmallBlue',
  'shareSmallDark',
  'shareSmallGrey',
  'thumbsDownGrey',
  'thumbsDownWhite',
  'thumbsUpGrey',
  'thumbsUpWhite',
  'transfer',
  'trash',
  'trendingApps',
  'twitter',
  'underline',
  'upload',
  'video',
  'wallet',
  'walletconnect',
];

export interface IconProps extends CommonInterface<any> {
  color?: string;
  fill?: string;
  ref?: React.Ref<HTMLDivElement>;
  type: IconType | string;
  clickable?: boolean;
  clickableRed?: boolean;
  primaryColor?: boolean;
  accentColor?: boolean;
  size?: 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  disabled?: boolean;
  wrapperStyle?: React.CSSProperties;
  testId?: string;
}

const StyledRefDiv = styled.div`
  display: flex;
  align-items: center;
  user-select: none;
`;

const IconBase: React.FC<IconProps> = React.forwardRef((props, ref) => {
  const Component = (icons as any)[props.type];
  const { primaryColor, accentColor, clickable, testId, ...other } = props;
  if (!Component) {
    // tslint:disable-next-line no-console
    console.error('There is no such icon', props.type);
    return null;
  }
  const iconClass = classNames('icon', props.className);
  return (
    <StyledRefDiv ref={ref} style={props.wrapperStyle}>
      <Component className={iconClass} data-testid={testId} {...other} />
    </StyledRefDiv>
  );
});

const Icon: React.FC<IconProps> = styled(IconBase)`
  ${props =>
    props.color &&
    `
      & * {
        stroke: ${props.color};
      }`};
  ${props =>
    props.fill &&
    `
      & * {
        fill: ${props.fill};
      }`};
  ${props =>
    props.primaryColor &&
    `
      & * {
        stroke: ${props.theme.colors.primaryText};
      }`};
  ${props =>
    props.accentColor &&
    `
      & * {
        stroke: ${props.theme.colors.accent};
      }`};
  ${props =>
    props.clickable &&
    !props.disabled &&
    `
      cursor: pointer;
      &: hover {
        & * {
          stroke: ${props.theme.colors.accent};
        }
      }
    `};
  ${props =>
    props.clickableRed &&
    `
        cursor: pointer;
        &: hover {
          & * {
            stroke: ${props.theme.colors.red};
          }
        }
      `};
  ${props => {
    if (props.size) {
      switch (props.size) {
        case 'xxs':
          return css`
            width: 0.75rem;
            height: 0.75rem;
          `;
        case 'xs':
          return css`
            width: 1rem;
            height: 1rem;
          `;
        case 'sm':
          return css`
            width: 1.25rem;
            height: 1.25rem;
          `;
        case 'md':
          return css`
            width: 1.5rem;
            height: 1.5rem;
          `;
        case 'lg':
          return css`
            width: 2rem;
            height: 2rem;
          `;
        case 'xl':
          return css`
            width: 2.5rem;
            height: 2.5rem;
          `;
        default:
          return css`
            width: 1.5rem;
            height: 1.5rem;
          `;
      }
    }
    return;
  }};
`;

export default Icon;