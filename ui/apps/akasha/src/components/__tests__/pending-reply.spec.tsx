import * as React from 'react';
import * as queryListnerHooks from '@akashaorg/ui-awf-hooks/lib/use-query-listener';
import * as entryUtilHooks from '@akashaorg/ui-awf-hooks/lib/utils/entry-utils';

import {
  screen,
  renderWithAllProviders,
  act,
  genAppProps,
  genPendingPost,
  genUser,
} from '@akashaorg/af-testing';
import { PendingReply } from '../post-page/common/pending-reply';

describe('< PendingReply /> component', () => {
  const BaseComponent = (
    <PendingReply postId="oxfg" {...genAppProps()} loggedProfileData={genUser()} commentIds={[]} />
  );

  beforeAll(() => {
    (
      jest.spyOn(queryListnerHooks, 'useMutationsListener') as unknown as jest.SpyInstance<{
        mutations: {
          mutationId: number;
          state: Record<string, unknown>;
        }[];
      }>
    ).mockReturnValue({
      mutations: [{ mutationId: 1, state: { status: 'loading', variables: { postID: 'oxfg' } } }],
    });

    jest.spyOn(entryUtilHooks, 'createPendingEntry').mockReturnValue(genPendingPost());
  });

  it('should show pending reply', async () => {
    await act(async () => {
      renderWithAllProviders(BaseComponent, {});
    });
    expect(screen.getByText('pending post')).toBeInTheDocument();
  });
});