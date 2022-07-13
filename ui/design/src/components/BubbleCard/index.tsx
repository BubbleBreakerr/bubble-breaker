import * as React from 'react';
import { Descendant } from 'slate';
import { Box, Text } from 'grommet';
import { isMobileOnly } from 'react-device-detect';

import Icon from '../Icon';
import { BasicCardBox } from '../EntryCard/basic-card-box';
import { IconDiv } from '../TopBar/styled-topbar';

import { formatRelativeTime, ILocale } from '../../utils/time';
import ReadOnlyEditor from '../ReadOnlyEditor';

type chatStatus = 'sent' | 'delivered' | 'read';

export interface IBubbleCardProps {
  locale: ILocale;
  sender?: string;
  youLabel: string;
  content?: Descendant[];
  status?: chatStatus;
  isLoggedUser?: boolean;
  chatTimestamp?: string;
  onMentionClick?: () => void;
  onTagClick?: () => void;
  onLinkClick?: () => void;
}

const BubbleCard: React.FC<IBubbleCardProps> = props => {
  const {
    locale,
    sender,
    youLabel,
    content,
    status,
    isLoggedUser,
    chatTimestamp,
    onMentionClick,
    onTagClick,
    onLinkClick,
  } = props;

  const chatStatusIcon = {
    sent: 'checkSimple',
    delivered: 'checkDouble',
    read: 'checkDouble',
  };

  const [isActive, setIsActive] = React.useState(false);

  const handleIconClick = () => setIsActive(!isActive);

  const handleMentionClick = () => {
    if (onMentionClick) {
      onMentionClick();
    }
  };
  const handleTagClick = () => {
    if (onTagClick) {
      onTagClick();
    }
  };
  const handleLinkClick = () => {
    if (onLinkClick) {
      onLinkClick();
    }
  };

  const time = chatTimestamp?.split('T')[1].split(':');

  return (
    <Box>
      <Box direction="row" justify="between" margin={{ bottom: 'xsmall' }}>
        <Text>{isLoggedUser ? youLabel : sender}</Text>
        <Text color="secondaryText">{formatRelativeTime(chatTimestamp, locale)}</Text>
      </Box>
      <BasicCardBox
        noBorderRadius
        style={{ minHeight: 'min-content' }} // allows cards to adjust in a y-scrollable container
      >
        <Box pad="small" style={{ cursor: 'pointer' }}>
          <Box direction="row" justify="between">
            <Box direction="row" align="start">
              <Box align="start" margin={{ left: 'small' }}>
                <ReadOnlyEditor
                  content={content}
                  handleMentionClick={handleMentionClick}
                  handleTagClick={handleTagClick}
                  handleLinkClick={handleLinkClick}
                />
              </Box>
            </Box>
            {isLoggedUser && (
              <Box direction="row" height="fit-content" flex={{ shrink: 0 }} align="start">
                <IconDiv onClick={handleIconClick} isActive={isActive} isMobile={isMobileOnly}>
                  <Icon size="xs" plain={true} accentColor={isActive} type="moreDark" />
                </IconDiv>
              </Box>
            )}
          </Box>
          <Box direction="row" height="fit-content" flex={{ shrink: 0 }} justify="end">
            {chatTimestamp && (
              <Text
                color="secondaryText"
                margin={{ ...(status && { right: 'xsmall' }) }}
              >{`${time[0]}:${time[1]}`}</Text>
            )}
            {isLoggedUser && status && (
              <Icon size="sm" accentColor={status === 'read'} type={chatStatusIcon[status]} />
            )}
          </Box>
        </Box>
      </BasicCardBox>
    </Box>
  );
};

export default BubbleCard;