import * as React from 'react';
import ReactDOM from 'react-dom';
import { I18nextProvider, useTranslation } from 'react-i18next';
import singleSpaReact from 'single-spa-react';
import { RootExtensionProps } from '@akashaorg/ui-awf-typings';
import { BrowserRouter as Router, useRouteMatch, Route } from 'react-router-dom';
import DS from '@akashaorg/design-system';
import {
  useGetEntryAuthor,
  useIsFollowingMultiple,
  useFollow,
  useUnfollow,
  useGetLogin,
  withProviders,
  ThemeWrapper,
} from '@akashaorg/ui-awf-hooks';

const { Box, ProfileMiniCard, ErrorLoader } = DS;

const ProfileCardWidget: React.FC<RootExtensionProps> = props => {
  const { params } = useRouteMatch<{ postId: string }>();
  const { t } = useTranslation('app-akasha-integration');

  const loginQuery = useGetLogin();

  const profileDataReq = useGetEntryAuthor(params.postId);
  const profileData = profileDataReq.data;

  const isFollowingReq = useIsFollowingMultiple(loginQuery.data?.ethAddress, [
    profileData?.ethAddress,
  ]);
  const followedProfiles = isFollowingReq.data;
  const followReq = useFollow();
  const unfollowReq = useUnfollow();

  const handleFollow = () => {
    if (profileData?.ethAddress) {
      followReq.mutate(profileData?.ethAddress);
    }
  };

  const handleUnfollow = () => {
    if (profileData?.ethAddress) {
      unfollowReq.mutate(profileData?.ethAddress);
    }
  };

  const handleProfileClick = (pubKey: string) => {
    props.plugins?.routing?.navigateTo?.({
      appName: '@akashaorg/app-profile',
      getNavigationUrl: navRoutes => `${navRoutes.rootRoute}/${pubKey}`,
    });
  };

  const isFollowing = React.useMemo(() => {
    if (followedProfiles.includes(profileData?.ethAddress)) {
      return true;
    }
    return false;
  }, [followedProfiles, profileData?.ethAddress]);

  if (!profileData?.ethAddress) {
    return null;
  }

  return (
    <Box pad={{ bottom: 'small' }} height={{ max: '30rem' }}>
      <ProfileMiniCard
        handleClick={handleProfileClick}
        handleFollow={handleFollow}
        handleUnfollow={handleUnfollow}
        isFollowing={isFollowing}
        loggedEthAddress={loginQuery.data?.ethAddress}
        profileData={profileData}
        followLabel={t('Follow')}
        unfollowLabel={t('Unfollow')}
        followingLabel={t('Following')}
        followersLabel={t('Followers')}
        postsLabel={t('Posts')}
      />
    </Box>
  );
};

// Router is required for the useRouteMatch hook to extract the postId from the url
const Wrapped = (props: RootExtensionProps) => (
  <Router>
    <Route path="/social-app/post/:postId">
      <I18nextProvider i18n={props.plugins?.translation?.i18n}>
        <ProfileCardWidget {...props} />
      </I18nextProvider>
    </Route>
  </Router>
);

const reactLifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: withProviders(Wrapped),
  errorBoundary: (err, errorInfo, props: RootExtensionProps) => {
    if (props.logger) {
      props.logger.error(`${JSON.stringify(errorInfo)}, ${errorInfo}`);
    }
    return (
      <ThemeWrapper {...props}>
        <ErrorLoader
          type="script-error"
          title="Error in profile card widget"
          details={err.message}
        />
      </ThemeWrapper>
    );
  },
});

export const bootstrap = reactLifecycles.bootstrap;

export const mount = reactLifecycles.mount;

export const unmount = reactLifecycles.unmount;