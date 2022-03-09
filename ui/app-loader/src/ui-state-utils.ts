import { ILogger } from '@akashaproject/sdk-typings/lib/interfaces/log';
import {
  EventTypes,
  ILoaderConfig,
  INTEGRATION_TYPES,
} from '@akashaproject/ui-awf-typings/lib/app-loader';
import { combineLatest, filter, Observable, tap, withLatestFrom } from 'rxjs';
import { getStateSlice, LoaderState } from './state';
import * as singleSpa from 'single-spa';
import { uiEvents } from './events';

export const handleAppLoadingScreens = (
  worldConfig: ILoaderConfig,
  state$: Observable<LoaderState>,
  _logger: ILogger,
) => {
  return state$
    .pipe(getStateSlice('spaEvents'))
    .pipe(filter(data => data?.eventName === 'single-spa:before-mount-routing-event'))
    .pipe(
      withLatestFrom(
        combineLatest({
          manifests: state$.pipe(getStateSlice('manifests')),
          user: state$.pipe(getStateSlice('user')),
          integrationConfigs: state$.pipe(getStateSlice('integrationConfigs')),
        }),
      ),
      tap(([, combined]) => {
        const { user, manifests } = combined;
        const defaultWidgets = worldConfig.defaultWidgets;
        const layout = worldConfig.layout;
        // const eventDetail = event.detail;
        const mountedApps = singleSpa
          .getMountedApps()
          .filter(
            name =>
              !defaultWidgets.includes(name) &&
              name !== layout &&
              !manifests.some(
                manifest =>
                  manifest.name === name &&
                  manifest.integrationType !== INTEGRATION_TYPES.APPLICATION,
              ),
          );
        if (!mountedApps.length) {
          if (location.pathname === '/') {
            const homeApp = worldConfig.homepageApp;
            const config = combined.integrationConfigs.get(homeApp);
            if (config) {
              singleSpa.navigateToUrl(config.routes.defaultRoute);
            }
            return;
          }
          if (user.waitForAuth) {
            uiEvents.next({
              event: EventTypes.LayoutShowLoadingUser,
            });
          } else {
            uiEvents.next({
              event: EventTypes.LayoutShowAppLoading,
            });
          }
        }
      }),
    );
};