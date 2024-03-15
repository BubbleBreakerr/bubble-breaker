import React from 'react';
import { useTranslation } from 'react-i18next';
import { NavigateToParams, ModalNavigationOptions } from '@akashaorg/typings/lib/ui';
import { useGetLogin } from '@akashaorg/ui-awf-hooks';

import { ProfileStats as ProfileStatsPresentation } from '@akashaorg/design-system-components/lib/components/Profile';

export type ProfileStatsProps = {
  profileDid: string;
  totalBeams: number;
  totalTopics: number;
  totalFollowers: number;
  totalFollowing: number;
  navigateTo: (args: NavigateToParams) => void;
  showLoginModal: (redirectTo?: { modal: ModalNavigationOptions }) => void;
};

const ProfileStats: React.FC<ProfileStatsProps> = ({
  profileDid,
  totalBeams,
  totalTopics,
  totalFollowers,
  totalFollowing,
  navigateTo,
  showLoginModal,
}) => {
  const { t } = useTranslation('app-profile');

  const { data } = useGetLogin();
  const isLoggedIn = !!data?.id;

  const onStatClick = (stat: 'beams' | 'followers' | 'following' | 'interests') => () => {
    if (!isLoggedIn) {
      return showLoginModal();
    }
    navigateTo({
      appName: '@akashaorg/app-profile',
      getNavigationUrl: () => `/${profileDid}/${stat}`,
    });
  };

  return (
    <ProfileStatsPresentation
      posts={{
        label: t('Beams'),
        total: totalBeams,
        onClick: totalBeams > 0 ? onStatClick('beams') : null,
      }}
      interests={{
        label: t('Interests'),
        total: totalTopics,
        onClick: onStatClick('interests'),
      }}
      followers={{
        label: t('Followers'),
        total: totalFollowers,
        onClick: onStatClick('followers'),
      }}
      following={{
        label: t('Following'),
        total: totalFollowing,
        onClick: onStatClick('following'),
      }}
    />
  );
};

export default ProfileStats;
