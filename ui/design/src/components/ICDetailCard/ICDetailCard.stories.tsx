import React from 'react';
import { Box, Grommet } from 'grommet';
import { isMobileOnly } from 'react-device-detect';

import ICDetailCard, { ICDetailCardProps } from '.';

import lightTheme from '../../styles/themes/light/light-theme';
import { ICWorldAppsData } from '../../utils/dummy-data';

export default {
  title: 'Cards/ICDetailCard',
  component: ICDetailCard,
  argType: {
    onClickShare: { action: 'clicked share' },
    onClickCTA: { action: 'clicked CTA' },
    onClickInstall: { action: 'clicked Install' },
    onClickUninstall: { action: 'clicked Uninstall' },
  },
};

const Template = (args: ICDetailCardProps) => {
  const [isInstalled, setIsInstalled] = React.useState(true);

  return (
    <Grommet theme={lightTheme}>
      <Box width={isMobileOnly ? '100%' : '30%'} pad="none" align="center">
        <ICDetailCard
          {...args}
          isInstalled={isInstalled}
          onClickInstall={() => setIsInstalled(true)}
          onClickUninstall={() => setIsInstalled(false)}
        />
      </Box>
    </Grommet>
  );
};

export const BaseICDetailCard = Template.bind({});

BaseICDetailCard.args = {
  shareLabel: 'Share',
  id: ICWorldAppsData[3].id,
  avatar: ICWorldAppsData[3].avatar,
  coverImage: ICWorldAppsData[3].coverImage,
  installLabel: 'Install',
  uninstallLabel: 'Uninstall',
  installedLabel: 'Installed',
  descriptionLabel: 'Description',
  descriptionContent: ICWorldAppsData[3].description,
  showMoreLabel: 'Show More',
  linksLabel: 'Links',
  releasesLabel: 'Releases',
  releaseTypeLabel: 'Release Type',
  releaseIdLabel: 'Release Id',
  releases: ICWorldAppsData[3].releases,
  versionHistoryLabel: 'Version History',
  authorsLabel: 'Authors & Contributors',
  authors: ICWorldAppsData[3].authors,
  tags: ICWorldAppsData[3].tags,
  licenseLabel: 'License',
  license: ICWorldAppsData[3].license,
};