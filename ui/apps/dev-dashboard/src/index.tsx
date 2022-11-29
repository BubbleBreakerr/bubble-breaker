import 'systemjs-webpack-interop/auto-public-path';
import {
  IAppConfig,
  IntegrationRegistrationOptions,
  MenuItemAreaType,
  MenuItemType,
  LogoTypeSource,
} from '@akashaorg/typings/ui';

import routes, { DASHBOARD } from './routes';

/**
 * All apps must export an object like this:
 */
export const register: (opts: IntegrationRegistrationOptions) => IAppConfig = opts => ({
  loadingFn: () => import('./components'),
  mountsIn: opts.layoutConfig?.pluginSlotId,
  i18nNamespace: ['app-dev-dashboard'],
  extends: (matcher, loader) => {
    matcher({
      'delete-dev-key': loader(() => import('./extensions/delete-dev-key')),
    });
  },
  routes: {
    defaultRoute: routes[DASHBOARD],
    ...routes,
  },
  title: 'Dev Dashboard | Ethereum World',
  menuItems: {
    label: 'Dev Dashboard',
    type: MenuItemType.App,
    logo: { type: LogoTypeSource.ICON, value: 'dashboard' },
    area: [MenuItemAreaType.UserAppArea],
    subRoutes: [],
  },
});