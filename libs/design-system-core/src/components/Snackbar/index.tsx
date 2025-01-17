import React from 'react';
import { NotificationTypes } from '@akashaorg/typings/lib/ui';
import Button from '../Button';
import Card from '../Card';
import Icon from '../Icon';
import { InformationCircleIcon, XMarkIcon } from '../Icon/hero-icons-outline';
import Stack from '../Stack';
import Text from '../Text';
import { Color } from '../types/common.types';
import { getColorLight, getColorDark } from './getColor';

export type SnackbarProps = {
  title: React.ReactNode;
  type?: NotificationTypes;
  icon?: React.ReactElement;
  description?: string;
  actionButtonLabel?: string;
  customStyle?: string;
  handleButtonClick?: (event: React.SyntheticEvent<Element, Event>) => void;
  handleDismiss?: (event: React.SyntheticEvent<Element, Event>) => void;
};

const Snackbar: React.FC<SnackbarProps> = ({
  title,
  type = NotificationTypes.Info,
  icon = <InformationCircleIcon />,
  description,
  actionButtonLabel,
  customStyle = '',
  handleButtonClick,
  handleDismiss,
}) => {
  const colorLight = getColorLight(type);
  const colorDark = getColorDark(type);

  const textColor: Color = { dark: 'white', light: 'black' };

  const instanceStyle = `p-4 border(l-8 solid ${colorLight}/30 dark:${colorDark}/30)`;

  return (
    <Card
      radius={8}
      background={{ light: 'white', dark: 'grey1' }}
      customStyle={`${instanceStyle} ${customStyle}`}
    >
      <Stack spacing="gap-x-3" fullWidth direction="row">
        <Icon icon={icon} color={{ light: colorLight, dark: colorDark }} size="lg" />
        <Stack direction="column">
          <Text variant="button-md" color={textColor}>
            {title}
          </Text>
          {description && (
            <Text variant="body2" color={textColor}>
              {description}
            </Text>
          )}
          {actionButtonLabel && (
            <Button onClick={handleButtonClick} plain>
              <Text variant="button-md" color={{ light: `${colorLight}`, dark: `${colorDark}` }}>
                {actionButtonLabel}
              </Text>
            </Button>
          )}
        </Stack>
        <Button
          onClick={handleDismiss}
          customStyle="self-start	ml-auto"
          aria-label="dismiss"
          plain={true}
        >
          <Icon icon={<XMarkIcon />} color="grey7" size="lg" />
        </Button>
      </Stack>
    </Card>
  );
};

export default Snackbar;
