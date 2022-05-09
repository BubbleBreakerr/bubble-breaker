import { renderHook } from '@testing-library/react-hooks';
import { mockSDK } from '@akashaorg/af-testing';
import { createWrapper } from './utils';
import { of as mockOf } from 'rxjs';
import { useTrendingProfiles, useTrendingTags } from '../use-trending';
import { mockTrendingProfiles, mockTrendingTags } from '../__mocks__/trending';

jest.mock('@akashaorg/awf-sdk', () => {
  return () =>
    mockSDK({
      profile: {
        getTrending: () => mockOf(mockTrendingProfiles),
      },
      tags: {
        getTrending: () => mockOf(mockTrendingTags),
      },
      common: {
        ipfs: {
          buildIpfsLinks: () => 'link',
        },
      },
    });
});

describe('useTrending', () => {
  it('should get trending profiles', async () => {
    const [wrapper] = createWrapper();
    const { result, waitFor } = renderHook(() => useTrendingProfiles(), {
      wrapper,
    });
    await waitFor(() => result.current.isFetched, { timeout: 5000 });
    expect(result.current.data).toHaveLength(20);
  });

  it('should get trending tags', async () => {
    const [wrapper] = createWrapper();
    const { result, waitFor } = renderHook(() => useTrendingTags(), {
      wrapper,
    });
    await waitFor(() => result.current.isFetched, { timeout: 5000 });
    expect(result.current.data).toHaveLength(11);
  });
});