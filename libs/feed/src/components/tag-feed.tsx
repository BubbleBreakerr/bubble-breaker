import * as React from 'react';
import ErrorLoader from '@akashaorg/design-system-core/lib/components/ErrorLoader';
import Spinner from '@akashaorg/design-system-core/lib/components/Spinner';
import Stack from '@akashaorg/design-system-core/lib/components/Stack';
import InfoCard from '@akashaorg/design-system-core/lib/components/InfoCard';
import { useTranslation } from 'react-i18next';
import { AnalyticsEventData } from '@akashaorg/typings/lib/ui';
import { AkashaIndexedStreamEdge } from '@akashaorg/typings/lib/sdk/graphql-types-new';
import { EdgeArea, Virtualizer, VirtualizerProps } from '../virtual-list';
import { useBeamsByTags } from '@akashaorg/ui-awf-hooks/lib/use-beams-by-tags';
import { RestoreItem } from '../virtual-list/use-scroll-state';
import { useAkashaStore, useNsfwToggling } from '@akashaorg/ui-awf-hooks';
import { getNsfwFiltersTagFeed } from '../utils';

export type TagFeedProps = {
  className?: string;
  scrollerOptions?: { overscan: number };
  queryKey: string;
  newItemsPublishedLabel?: string;
  estimatedHeight?: VirtualizerProps<unknown>['estimatedHeight'];
  itemSpacing?: VirtualizerProps<unknown>['itemSpacing'];
  header?: VirtualizerProps<unknown>['header'];
  footer?: VirtualizerProps<unknown>['footer'];
  tags: string[];
  trackEvent?: (data: AnalyticsEventData['data']) => void;
  scrollTopIndicator?: VirtualizerProps<unknown>['scrollTopIndicator'];
  renderItem: VirtualizerProps<AkashaIndexedStreamEdge>['renderItem'];
  loadingIndicator?: VirtualizerProps<unknown>['loadingIndicator'];
};

const TagFeed = (props: TagFeedProps) => {
  const {
    scrollerOptions = { overscan: 5 },
    scrollTopIndicator,
    renderItem,
    queryKey,
    estimatedHeight = 150,
    itemSpacing,
    loadingIndicator,
    header,
    footer,
    tags,
  } = props;

  const { t } = useTranslation('ui-lib-feed');

  const { showNsfw } = useNsfwToggling();
  const {
    data: { authenticatedDID, isAuthenticating: authenticating },
  } = useAkashaStore();
  const isLoggedIn = !!authenticatedDID;
  const nsfwFilters = getNsfwFiltersTagFeed({ queryKey, showNsfw, isLoggedIn });

  const {
    beams,
    beamCursors,
    called,
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    hasPreviousPage,
    fetchInitialData,
    onReset,
    isLoading,
    hasErrors,
    errors,
  } = useBeamsByTags({ tag: tags, filters: nsfwFilters });

  React.useEffect(() => {
    /**
     * Refetch data in case nsfw setting is on and user is either logged in or out
     **/
    if (!authenticating && showNsfw) {
      /**
       * Reset the beamCursors in case the user logs out and has the NSFW setting on
       * so as to be able to accept the updated data in the `extractData` function
       *  when the hook refetches again (Specificallly for dealing with the filter condition
       *  `!beamCursors.has(edge.cursor)` inside the extractData function inside the hook
       *  because if not reset, no data will be extracted
       * from the function because the existing beamCursors will contain the data.cursor and
       * therefore the feed doesn't get updated correctly sometimes with nsfw content when toggling
       * the nswf setting on).
       **/
      beamCursors.clear();
      fetchInitialData();
    }
  }, [authenticating, showNsfw]);

  React.useEffect(() => {
    /**
     * Everytime the NSFW setting changes, refetch.
     **/
    fetchInitialData();
  }, [showNsfw]);

  const lastCursors = React.useRef({ next: null, prev: null });
  const prevBeams = React.useRef([]);

  const loadingIndicatorRef = React.useRef(loadingIndicator);

  if (!loadingIndicatorRef.current) {
    loadingIndicatorRef.current = () => (
      <Stack align="center">
        <Spinner />
      </Stack>
    );
  }

  const handleInitialFetch = async (restoreItem?: RestoreItem) => {
    await fetchInitialData(true, restoreItem);
  };

  const handleFetch = React.useCallback(
    async (newArea: EdgeArea) => {
      switch (newArea) {
        case EdgeArea.TOP:
        case EdgeArea.NEAR_TOP:
          if (!beams.length) return;
          const firstCursor = beams[0].cursor;
          if (lastCursors.current.prev !== firstCursor) {
            lastCursors.current.prev = firstCursor;
            await fetchPreviousPage(firstCursor);
          }
          break;
        case EdgeArea.BOTTOM:
        case EdgeArea.NEAR_BOTTOM:
          if (!beams.length) return;
          const lastCursor = beams[beams.length - 1].cursor;
          if (lastCursors.current.next !== lastCursor) {
            lastCursors.current.next = lastCursor;
            await fetchNextPage(lastCursor);
          }
          break;
        default:
          break;
      }
    },
    [beams, fetchNextPage, fetchPreviousPage],
  );

  const handleReset = async () => {
    prevBeams.current = [];
    lastCursors.current = { next: null, prev: null };
    await onReset();
  };

  const emptyListCard = (
    <Stack customStyle="mt-8">
      <InfoCard
        titleLabel={
          <>
            {t('There is no content found for the ')}
            {t('{{topic}}', { topic: tags.length > 1 ? 'topics' : 'topic' })}{' '}
            {tags.map(tag => (
              <span key={tag}>#{tag} </span>
            ))}
          </>
        }
        bodyLabel={
          <>
            {t('Be the first one to create a beam for this topic')}
            {'! 🚀'}
          </>
        }
        bodyVariant="body1"
        assetName="longbeam-notfound"
      />
    </Stack>
  );

  return (
    <>
      {hasErrors && (
        <ErrorLoader
          type="script-error"
          title={'Sorry, there was an error when fetching beams'}
          details={<>{errors}</>}
        />
      )}

      {!hasErrors && tags && (
        <Virtualizer<ReturnType<typeof useBeamsByTags>['beams'][0]>
          header={header}
          footer={footer}
          requestStatus={{
            called,
            isLoading,
          }}
          emptyListIndicator={emptyListCard}
          restorationKey={queryKey}
          itemSpacing={itemSpacing}
          estimatedHeight={estimatedHeight}
          overscan={scrollerOptions.overscan}
          items={beams}
          onFetchInitialData={handleInitialFetch}
          itemKeyExtractor={item => item.cursor}
          itemIndexExtractor={item => beams.findIndex(p => p.cursor === item.cursor)}
          onListReset={handleReset}
          onEdgeDetectorChange={handleFetch}
          scrollTopIndicator={scrollTopIndicator}
          renderItem={renderItem}
          loadingIndicator={loadingIndicatorRef.current}
          hasNextPage={hasNextPage}
          hasPreviousPage={hasPreviousPage}
        />
      )}
    </>
  );
};

export default TagFeed;
