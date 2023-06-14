import * as React from 'react';
import { IEntryData } from '@akashaorg/typings/ui';
import { tw } from '@twind/core';
import Text from '@akashaorg/design-system-core/lib/components/Text';
import Icon from '@akashaorg/design-system-core/lib/components/Icon';

export interface CardActionProps {
  // data
  entryData: IEntryData;
  // anchor link
  repliesAnchorLink?: string;
  // handlers
  onRepost: () => void;
  handleRepliesClick: () => void;
  disableActions?: boolean;
  disableReposting?: boolean;
  hideRepost?: boolean;
  isModerated?: boolean;
  actionsRightExt?: React.ReactNode;
}

const CardActions: React.FC<CardActionProps> = props => {
  const {
    // data
    entryData,
    repliesAnchorLink,
    // handlers
    onRepost,
    handleRepliesClick,
    disableReposting,
    hideRepost,
    disableActions,
    isModerated,
    actionsRightExt,
  } = props;

  const repostsBtnText = `${entryData.reposts || ''}`;
  const repliesBtnText = `${entryData.replies || 0}`;

  if (isModerated) {
    return (
      <div
        className={tw(`flex flex-row items-center justify-end space-x-4 w-3/4 self-center py-4`)}
      >
        <button onClick={handleRepliesClick} className={tw(`flex flex-row items-center space-x-2`)}>
          <Icon type="ChatBubbleLeftRightIcon" accentColor={true} />
          <Text color={{ light: 'secondaryLight', dark: 'secondaryDark' }}>{repliesBtnText}</Text>
        </button>
        <button
          onClick={onRepost}
          className={tw(`flex flex-row items-center space-x-2`)}
          disabled={disableReposting}
        >
          <Icon type="ArrowPathIcon" accentColor={true} />
          <Text color={{ light: 'secondaryLight', dark: 'secondaryDark' }}>{repostsBtnText}</Text>
        </button>
      </div>
    );
  }

  return (
    <div className={tw(`p-4 flex flex-row items-center justify-end space-x-4`)}>
      <>{actionsRightExt}</>
      <a
        onClick={e => {
          e.preventDefault();
          return false;
        }}
        href={`${repliesAnchorLink}/${entryData.entryId}`}
        className={tw(`no-underline`)}
      >
        <button
          onClick={handleRepliesClick}
          className={tw(`flex flex-row items-center space-x-2`)}
          disabled={disableActions}
        >
          <Icon type="ChatBubbleLeftRightIcon" accentColor={true} />
          <Text color={{ light: 'secondaryLight', dark: 'secondaryDark' }}>{repliesBtnText}</Text>
        </button>
      </a>

      {!hideRepost && (
        <button
          onClick={onRepost}
          className={tw(`flex flex-row items-center space-x-2`)}
          disabled={disableReposting || disableActions}
        >
          <Icon type="ArrowPathIcon" accentColor={true} />
          <Text color={{ light: 'secondaryLight', dark: 'secondaryDark' }}>{repostsBtnText}</Text>
        </button>
      )}
    </div>
  );
};

export default CardActions;