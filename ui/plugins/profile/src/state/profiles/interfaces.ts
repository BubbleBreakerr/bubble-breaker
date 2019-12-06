import { IEntryData } from '@akashaproject/design-system/lib/components/Cards/entry-box';

export type activeProfilesFilterType = 'followers' | 'following';
export type activeAppsFilterType = 'installed' | 'available';

export interface IPostalAddress {
  addressLocality: string;
  addressRegion: string;
  postalCode: string;
  streetAddress: string;
}

export interface IProfile {
  avatar?: string;
  name: string;
  description?: string;
  coverImage?: string;
  email?: string;
  url?: string;
  address?: IPostalAddress;
  ethAddress: string;
}

export interface IProfileFollowers {
  profileId: string;
  followers: string;
}
export interface IProfileFollowings {
  profileId: string;
  followings: string;
}
export interface IApp {}

export interface IFeedItem {
  id: string;
}

/**
 * a feed
 * a list that contains only a reference to a feed item and author
 */
export interface IFeed {
  profileId: string;
  items: IFeedItem[];
}

/**
 * a feed item is an actual entry
 */

export interface IProfileState {
  profiles: IProfile[];
  followers: IProfileFollowers[];
  followings: IProfileFollowings[];
  apps: IApp[];
  feeds: IFeed[];
  activeProfilesFilter?: activeProfilesFilterType;
  activeAppsFilter?: activeAppsFilterType;
  loggedProfile?: string;
  feedItems: (IEntryData & { entryId: string })[];
}

export interface IReducer<S, A> {
  (action: A, state: S): S;
}

/* Action Payloads */
export interface IGetLoggedProfilePayload {
  loggedProfile: string;
}

export type IGetProfileFollowingsPayload = IProfileFollowings[];
export type IGetProfileFollowersPayload = IProfileFollowers[];
export interface IGetProfilesPayload {
  profiles: IProfile[];
}
export interface IGetMoreProfilesPayload {
  profiles: IProfile[];
}

export interface IGetAppsPayload {
  apps: IApp[];
}

export interface IGetMoreAppsPayload {
  apps: IApp[];
}

export interface IChangeProfilesFilter {
  filter: activeProfilesFilterType;
}

export interface IChangeAppsFilter {
  filter: activeAppsFilterType;
}