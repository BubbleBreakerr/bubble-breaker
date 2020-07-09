import authApi, { authModule } from './auth';
import commonApi, { commonModule } from './common';
import dbApi, { dbModule } from './db';
import profilesApi, { profilesModule } from './profiles';
import DIContainer from '@akashaproject/sdk-runtime/lib/DIContainer';
import { startServices } from '../utils';

export const apiModules = [authModule, commonModule, dbModule, profilesModule];
export const callableApi = [authApi, commonApi, dbApi, profilesApi];
export default function startApi(channel, di: DIContainer) {
  // prepare services
  startServices(apiModules, di);
  // assemble the api object
  const apiMap = callableApi.map(api => api(channel));
  return apiMap.reduce((acc, current) => Object.assign(acc, current), {});
}