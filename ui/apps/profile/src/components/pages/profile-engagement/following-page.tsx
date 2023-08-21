import React, { useMemo, useState } from 'react';
import FollowProfile from '../../follow-profile';
import Following from '@akashaorg/design-system-components/lib/components/ProfileEngagements/Engagement/Following';
import EngagementTab from './engagement-tab';
import Box from '@akashaorg/design-system-core/lib/components/Box';
import EntryError from '@akashaorg/design-system-components/lib/components/ProfileEngagements/Entry/EntryError';
import { RootComponentProps, ModalNavigationOptions } from '@akashaorg/typings/ui';
import { useParams } from 'react-router-dom';
import {
  useGetProfileByDidQuery,
  useInfiniteGetFollowingListByDidQuery,
} from '@akashaorg/ui-awf-hooks/lib/generated/hooks-new';
import { getProfileImageVersionsWithMediaUrl, hasOwn, useGetLogin } from '@akashaorg/ui-awf-hooks';
import ProfileEngagementLoading from '@akashaorg/design-system-components/lib/components/ProfileEngagements/placeholders/profile-engagement-loading';

const FollowingPage: React.FC<RootComponentProps> = props => {
  const { plugins } = props;
  const { profileId } = useParams<{ profileId: string }>();

  const navigateTo = plugins['@akashaorg/app-routing']?.routing?.navigateTo;

  const [loadMore, setLoadingMore] = useState(false);
  const loginQuery = useGetLogin();

  const showLoginModal = (redirectTo?: { modal: ModalNavigationOptions }) => {
    props.navigateToModal({ name: 'login', redirectTo });
  };
  const profileDataReq = useGetProfileByDidQuery(
    {
      id: profileId,
    },
    {
      select: response => response.node,
      enabled: !!loginQuery.data?.id,
    },
  );
  const followingReq = useInfiniteGetFollowingListByDidQuery(
    'first',
    {
      id: profileId,
      first: 10,
    },
    {
      getNextPageParam: lastPage => {
        const pageInfo =
          lastPage?.node && hasOwn(lastPage?.node, 'isViewer')
            ? lastPage.node.akashaFollowList?.pageInfo
            : null;
        if (pageInfo && pageInfo.hasNextPage) {
          return { after: pageInfo.endCursor };
        }
      },
      getPreviousPageParam: firstPage => {
        const pageInfo =
          firstPage?.node && hasOwn(firstPage?.node, 'isViewer')
            ? firstPage.node.akashaFollowList?.pageInfo
            : null;
        if (pageInfo && pageInfo.hasPreviousPage) {
          return { before: pageInfo.startCursor };
        }
      },
      onSettled: () => {
        setLoadingMore(false);
      },
      enabled: !!loginQuery.data?.id,
    },
  );
  const following = useMemo(
    () =>
      followingReq.data?.pages
        ? followingReq.data.pages?.flatMap(page =>
            hasOwn(page.node, 'isViewer')
              ? page?.node?.akashaFollowList?.edges?.map(edge => edge?.node) || []
              : [],
          )
        : [],
    [followingReq.data],
  );

  const lastPageInfo = React.useMemo(() => {
    const lastPage = followingReq.data?.pages?.[followingReq.data?.pages?.length - 1];
    return lastPage?.node && hasOwn(lastPage?.node, 'isViewer')
      ? lastPage?.node.akashaFollowList?.pageInfo
      : null;
  }, [followingReq]);

  if (!loginQuery.data?.id) {
    return navigateTo({
      appName: '@akashaorg/app-profile',
      getNavigationUrl: () => `/${profileId}`,
    });
  }

  const { isViewer, profile: profileData } = Object.assign(
    { isViewer: null, profile: null },
    profileDataReq.data,
  );
  const onProfileClick = (profileId: string) => {
    navigateTo?.({
      appName: '@akashaorg/app-profile',
      getNavigationUrl: navRoutes => `${navRoutes.rootRoute}/${profileId}`,
    });
  };

  const onError = () => {
    navigateTo?.({
      appName: '@akashaorg/app-profile',
      getNavigationUrl: navRoutes => `${navRoutes.rootRoute}`,
    });
  };

  return (
    <EngagementTab isLoggedIn={!!loginQuery.data?.id} navigateTo={navigateTo}>
      {followingReq.status === 'loading' && <ProfileEngagementLoading />}
      {followingReq.status === 'error' && (
        <Box customStyle="mt-8">
          <EntryError onError={onError} />
        </Box>
      )}
      {followingReq.status === 'success' && (
        <Following
          following={following}
          profileAnchorLink={'/@akashaorg/app-profile'}
          ownerUserName={profileData.name}
          viewerIsOwner={isViewer}
          loadMore={loadMore}
          onLoadMore={() => {
            if (lastPageInfo && lastPageInfo.hasNextPage) {
              setLoadingMore(true);
              followingReq.fetchNextPage();
            }
          }}
          renderFollowElement={(profileStreamId, followStreamId, isFollowing) => (
            <FollowProfile
              loggedInProfileId={loginQuery.data?.id}
              profileStreamId={profileStreamId}
              isLoggedIn={!!loginQuery.data?.id}
              followStreamId={followStreamId}
              isFollowing={isFollowing}
              showLoginModal={showLoginModal}
            />
          )}
          onProfileClick={onProfileClick}
          getMediaUrl={getProfileImageVersionsWithMediaUrl}
        />
      )}
    </EngagementTab>
  );
};

export default FollowingPage;
