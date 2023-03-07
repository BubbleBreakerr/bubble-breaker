import React from 'react';
import Stack from '../../Stack';
import Text from '../../Text';
import Card from '../../Card';
import CopyToClipboard from '../../CopyToClipboard';
import AppIcon from '../../AppIcon';
import { getIconFromType } from './getIconFromType';
import { getLinkFromType } from './getLinkFromType';

export type Link = {
  type: string;
  value: string;
};

export interface LinksProps {
  title: string;
  links: Link[];
  copyLabel?: string;
  copiedLabel?: string;
}

const Links: React.FC<LinksProps> = ({ title, links }) => {
  return (
    <Card elevation="1" radius={20} padding={16}>
      <Stack direction="column" spacing="gap-y-2.5">
        <Text variant="label">{title}</Text>
        {links.map((link, index) => (
          <CopyToClipboard key={link.type + index} value={getLinkFromType(link, true)}>
            <Stack spacing="gap-x-2">
              <AppIcon placeholderIconType={getIconFromType(link.type)} size="sm" accentColor />
              <Text
                variant="body2"
                color={{ light: 'text-secondary-light', dark: 'text-secondary-dark' }}
                breakWord
              >
                {getLinkFromType(link)}
              </Text>
            </Stack>
          </CopyToClipboard>
        ))}
      </Stack>
    </Card>
  );
};

export default Links;