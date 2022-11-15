import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import DS from '@akashaorg/design-system';
import {
  RootComponentProps,
  EntityTypes,
  IProfileData,
  ModalNavigationOptions,
} from '@akashaorg/typings/ui';
import FeedWidget from '@akashaorg/ui-lib-feed/lib/components/App';
import { useInfinitePostsByAuthor, LoginState, useGetProfile } from '@akashaorg/ui-awf-hooks';

const { Box, Helmet, ErrorLoader } = DS;

export interface ProfilePageProps extends RootComponentProps {
  loggedProfileData: IProfileData;
  showLoginModal: (redirectTo?: { modal: ModalNavigationOptions }) => void;
  loginState: LoginState;
}

const ProfileFeedPage = (props: ProfilePageProps) => {
  const { loggedProfileData, showLoginModal, loginState } = props;
  const [erroredHooks, setErroredHooks] = React.useState([]);

  const { t } = useTranslation('app-profile');
  const { pubKey } = useParams<{ pubKey: string }>();

  const profileDataQuery = useGetProfile(pubKey, loginState?.pubKey, loginState?.fromCache);
  const profileState = profileDataQuery.data;

  const profileUserName = React.useMemo(() => {
    if (profileState && profileState.name) {
      return profileState.name;
    }
    return pubKey;
  }, [profileState, pubKey]);

  const reqPosts = useInfinitePostsByAuthor(
    pubKey,
    15,
    !!pubKey && !erroredHooks.includes('useInfinitePostsByAuthor'),
  );

  React.useEffect(() => {
    if (reqPosts.status === 'error' && !erroredHooks.includes('useInfinitePostsByAuthor')) {
      setErroredHooks(['useInfinitePostsByAuthor']);
    }
  }, [reqPosts, erroredHooks]);

  const handleLoadMore = React.useCallback(() => {
    if (!reqPosts.isLoading && reqPosts.hasNextPage && loginState?.fromCache) {
      reqPosts.fetchNextPage();
    }
  }, [reqPosts, loginState?.fromCache]);
  // @TODO: fix type
  const postPages: any = React.useMemo(() => {
    if (reqPosts.data) {
      return reqPosts.data.pages;
    }
    return [];
  }, [reqPosts.data]);

  const handleEntryFlag = (entryId: string, itemType: string) => () => {
    if (!loginState?.pubKey) {
      return showLoginModal({ modal: { name: 'report-modal', entryId, itemType } });
    }
    props.navigateToModal({ name: 'report-modal', entryId, itemType });
  };

  const handleEntryRemove = (entryId: string) => {
    props.navigateToModal({
      name: 'entry-remove-confirmation',
      entryId,
      entryType: EntityTypes.ENTRY,
    });
  };

  return (
    <Box fill="horizontal">
      <Helmet>
        <title>
          {t("{{profileUsername}}'s Page", { profileUsername: profileUserName || '' })} | Ethereum
          World
        </title>
      </Helmet>

      <>
        {reqPosts.isError && reqPosts.error && (
          <ErrorLoader
            type="script-error"
            title="Cannot get posts for this profile"
            details={(reqPosts.error as Error).message}
          />
        )}
        {reqPosts.isSuccess && !postPages && <div>There are no posts!</div>}
        {reqPosts.isSuccess && postPages && (
          <FeedWidget
            modalSlotId={props.layoutConfig.modalSlotId}
            itemType={EntityTypes.ENTRY}
            logger={props.logger}
            onLoadMore={handleLoadMore}
            getShareUrl={(itemId: string) =>
              `${window.location.origin}/@akashaorg/app-akasha-integration/post/${itemId}`
            }
            pages={postPages}
            requestStatus={reqPosts.status}
            loginState={loginState}
            loggedProfile={loggedProfileData}
            navigateTo={props.plugins['@akashaorg/app-routing']?.routing?.navigateTo}
            navigateToModal={props.navigateToModal}
            onLoginModalOpen={showLoginModal}
            hasNextPage={reqPosts.hasNextPage}
            contentClickable={true}
            onEntryFlag={handleEntryFlag}
            onEntryRemove={handleEntryRemove}
            removeEntryLabel={t('Delete Post')}
            removedByMeLabel={t('You deleted this post')}
            removedByAuthorLabel={t('This post was deleted by its author')}
            parentIsProfilePage={true}
            uiEvents={props.uiEvents}
            itemSpacing={8}
            i18n={props.plugins['@akashaorg/app-translation']?.translation?.i18n}
          />
        )}
      </>
    </Box>
  );
};

export default ProfileFeedPage;