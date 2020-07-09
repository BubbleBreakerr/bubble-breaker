import registerAuthModule from '@akashaproject/sdk-auth';
import authService from '@akashaproject/sdk-auth/lib/auth.service';
import { extractCallableServices } from '../utils';
import { AUTH_SERVICE } from '@akashaproject/sdk-auth/lib/constants';

export const authModule = registerAuthModule();

/**
 *
 * @param channel
 * returns { auth: { authService: { signIn }}}
 */
export default function authApi(channel) {
  const extractedServices = extractCallableServices(authModule, channel);
  return {
    [authModule.name]: {
      authService: {
        signIn: extractedServices[AUTH_SERVICE]('signIn'),
      },
    },
  };
}