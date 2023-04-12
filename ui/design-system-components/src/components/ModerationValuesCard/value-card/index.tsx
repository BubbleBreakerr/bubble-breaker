import React from 'react';
import { tw } from '@twind/core';

import Text from '@akashaorg/design-system-core/lib/components/Text';

export interface IModerationValueCardProps {
  publicImgPath?: string;
  assetName: string;
  label: string;
  description?: string;
  ctaLabel?: string;
  ctaUrl?: string;
  isMini?: boolean;
  onClick?: () => void;
}

const ModerationValueCard: React.FC<IModerationValueCardProps> = props => {
  const {
    publicImgPath = '/images',
    assetName,
    label,
    description,
    ctaLabel,
    ctaUrl,
    isMini = false,
    onClick,
  } = props;

  return (
    <div
      className={tw(`h-${isMini ? '32' : ''} bg-grey9 dark:bg-grey3 rounded-2xl cursor-pointer`)}
      onClick={onClick}
    >
      <div
        className={tw(`flex flex-col h-full p-${isMini ? '3' : '4'} items-center justify-evenly`)}
      >
        <div className={tw(`w-${isMini ? '16' : '72'} h-${isMini ? '16' : '72'}`)}>
          <img className={tw('object-contain')} src={`${publicImgPath}/${assetName}.webp`} />
        </div>

        <Text
          variant={isMini ? 'footnotes1' : 'h5'}
          align="center"
          color={{
            light: isMini ? 'secondaryLight' : 'black',
            dark: isMini ? 'secondaryDark' : 'white',
          }}
          weight="bold"
        >
          {label}
        </Text>
        {!isMini && (
          <div className={tw('flex flex-col w-full')}>
            {description && (
              <Text variant="body2" align="center">
                {description}
              </Text>
            )}
            {ctaLabel && (
              <a
                href={ctaUrl}
                className={tw(
                  'text-sm self-end font-bold no-underline text-secondaryLight dark:text-secondaryDark',
                )}
                target="_blank"
                rel="noreferrer noopener"
              >
                {ctaLabel}
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ModerationValueCard;