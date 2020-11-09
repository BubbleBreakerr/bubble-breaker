import * as React from 'react';
import { forkJoin } from 'rxjs';
import { IProfileData } from '@akashaproject/design-system/lib/components/Cards/profile-cards/profile-widget-card';

export interface HookErrorObj {
  errorKey: string;
  error: Error;
  critical: boolean;
}

type voidFunc<T = object> = (arg?: T) => void;

export interface UseProfileActions {
  getProfileData: voidFunc<{ ethAddress: string }>;
}

export interface UseProfileProps {
  onError: (error: HookErrorObj) => void;
  sdkModules: any;
}

/* A hook to be used on profile-page */
export const useProfile = (props: UseProfileProps): [Partial<IProfileData>, UseProfileActions] => {
  const { onError, sdkModules } = props;
  const [profile, setProfile] = React.useState<Partial<IProfileData>>({});

  const getMediaUrl = (ipfsGateway: string, hash?: string, data?: any) => {
    let ipfsUrl = '';

    if (hash && !data) {
      ipfsUrl = `${ipfsGateway}/${hash}`;
    }

    if (data) {
      let imageSize = '';
      for (const size in data) {
        if (data.hasOwnProperty(size)) {
          imageSize = size;
          break;
        }
      }
      if (imageSize) {
        ipfsUrl = `${ipfsGateway}/${hash}/${imageSize}/src`;
      }
    }

    return ipfsUrl;
  };

  const actions = {
    getProfileData: (payload: { ethAddress: string }) => {
      try {
        const ipfsGatewayCall = sdkModules.commons.ipfsService.getSettings({});
        const getProfileCall = sdkModules.profiles.profileService.getProfile({
          address: payload.ethAddress,
        });
        const obs = forkJoin([ipfsGatewayCall, getProfileCall]);
        obs.subscribe(
          (resp: any) => {
            if (!resp) {
              return;
            }
            const ipfsGateway = resp[0].data;
            const { address, username, avatar, backgroundImage, about, data, CID } = resp[1].data;
            const mappedProfileData: IProfileData = { ethAddress: address };
            if (data && data.firstName && data.lastName) {
              mappedProfileData.userName = `${data.firstName} ${data.lastName}`;
            }
            if (username) {
              mappedProfileData.ensName = username;
            }
            if (avatar) {
              mappedProfileData.avatar = getMediaUrl(ipfsGateway, avatar);
            }
            if (backgroundImage) {
              mappedProfileData.coverImage = getMediaUrl(
                ipfsGateway,
                backgroundImage.hash,
                backgroundImage.data,
              );
            }
            if (about) {
              mappedProfileData.description = about;
            }
            if (CID) {
              mappedProfileData.CID = CID;
            }
            setProfile(mappedProfileData);
          },
          err =>
            onError({
              errorKey: 'useProfile.getProfileData[subscription]',
              error: err,
              critical: false,
            }),
        );
      } catch (err) {
        onError({
          errorKey: 'useProfile.getProfileData',
          error: err,
          critical: false,
        });
      }
    },
  };

  return [profile, actions];
};

export default useProfile;