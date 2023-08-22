import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { Profile } from '@akashaorg/typings/ui';

import Stack from '@akashaorg/design-system-core/lib/components/Stack';

import Followers, {
  FollowersProps,
} from '../../components/ProfileEngagements/Engagement/Followers';

const meta: Meta<FollowersProps> = {
  title: 'DSComponents/Profile/Followers',
  component: Followers,
};

export default meta;
type Story = StoryObj<FollowersProps>;

const commonProps = {
  viewerIsOwner: false,
  profileAnchorLink: '#',
  loadMore: false,
  onLoadMore: () => ({}),
  getMediaUrl: () => ({
    default: { src: 'https://placebeard.it/360x360', width: 360, height: 360 },
  }),
  renderFollowElement: () => <></>,
  onProfileClick: () => ({}),
};

const followerData: Profile = {
  id: 'some id',
  createdAt: Date.now(),
  name: 'Coffee Lover',
  did: { id: 'did:key:73FaD4201494x0rt17B9892i9fae4d52fe3BD377' },
};

const variants: FollowersProps[] = [
  {
    ...commonProps,
    followers: [{ id: '1', isFollowing: false, profile: followerData }],
  },
  {
    ...commonProps,
    followers: [],
  },
  {
    ...commonProps,
    followers: [{ id: '1', isFollowing: false, profile: followerData }],
    viewerIsOwner: false,
  },
];

export const FollowersVariants: Story = {
  render: () => (
    <Stack direction="column" spacing="gap-y-2" customStyle="w-[50%]">
      {variants.map((variant, idx) => (
        <Followers key={idx} {...variant} />
      ))}
    </Stack>
  ),
};