import React from 'react';
import dayjs from 'dayjs';

import Box from '@akashaorg/design-system-core/lib/components/Box';
import Button from '@akashaorg/design-system-core/lib/components/Button';
import Text from '@akashaorg/design-system-core/lib/components/Text';

export type IMenuItem = {
  label?: string;
  icon?: string;
  iconColor?: string;
  plain?: boolean;
  handler?: (arg1?: React.SyntheticEvent) => void;
  disabled?: boolean;
};

export type DevKeyCardType = {
  id: string;
  name?: string;
  addedAt: string;
  usedAt?: string;
};

export type DevKeyCardProps = {
  item?: DevKeyCardType;
  nonameLabel: string;
  usedLabel: string;
  unusedLabel: string;
  pendingConfirmationLabel?: string;
  devPubKeyLabel: string;
  dateAddedLabel: string;
  editable?: boolean;
  onEditButtonClick?: () => void;
  onDeleteButtonClick?: () => void;
};

export const DevKeyCard: React.FC<DevKeyCardProps> = props => {
  const {
    item,
    nonameLabel,
    pendingConfirmationLabel,
    usedLabel,
    unusedLabel,
    devPubKeyLabel,
    dateAddedLabel,
    editable = false,
    onEditButtonClick,
    onDeleteButtonClick,
  } = props;

  if (!item) {
    return null;
  }

  return (
    <Box
      customStyle={`space-y-2 relative p-4 bg-(${
        !editable ? 'grey9 dark:grey3' : 'none'
      }) rounded-[1.25rem]`}
    >
      {/* key name section */}
      <Box customStyle="flex items-center justify-between">
        <Box customStyle="flex space-x-2 items-center">
          <Text weight="bold">{item?.name?.length ? item?.name : nonameLabel}</Text>

          <Box
            customStyle={`w-2 h-2 rounded-full bg-(${
              item?.usedAt ? 'success' : 'warningLight dark: warningDark'
            })`}
          />

          {pendingConfirmationLabel && <Text>{pendingConfirmationLabel}</Text>}

          {!pendingConfirmationLabel && <Text>{item?.usedAt ? usedLabel : unusedLabel}</Text>}
        </Box>
        {editable && (
          <Box customStyle="flex space-x-8 items-center">
            {/* date added section - editable card */}
            <Box customStyle="flex space-x-2 items-center">
              <Text variant="button-sm" weight="bold" color={{ light: 'grey4', dark: 'grey7' }}>
                {dateAddedLabel}
              </Text>

              <Text>{dayjs(item?.addedAt).format('DD/MM/YYYY')}</Text>
            </Box>

            {/* action buttons */}
            <Box customStyle="flex items-center space-x-4">
              <Button
                icon="PencilIcon"
                variant="primary"
                iconOnly={true}
                greyBg={true}
                onClick={onEditButtonClick}
              />

              <Button
                icon="TrashIcon"
                variant="primary"
                iconOnly={true}
                greyBg={true}
                onClick={onDeleteButtonClick}
              />
            </Box>
          </Box>
        )}
      </Box>

      {/* dev public key section */}
      <Box>
        {editable ? (
          <Text variant="button-sm" weight="bold" color={{ light: 'grey4', dark: 'grey7' }}>
            {devPubKeyLabel}
          </Text>
        ) : (
          <Text variant="h6" weight="bold">
            {devPubKeyLabel}
          </Text>
        )}

        <Text color={{ light: 'secondaryLight', dark: 'secondaryDark' }}>{item?.id}</Text>
      </Box>

      {/* date added section - non-editable card */}
      {!editable && (
        <Box>
          <Text variant="h6" weight="bold">
            {dateAddedLabel}
          </Text>

          <Text>{dayjs(item?.addedAt).format('DD/MM/YYYY')}</Text>
        </Box>
      )}
    </Box>
  );
};