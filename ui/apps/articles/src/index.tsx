import 'systemjs-webpack-interop/auto-public-path';
import routes, { HOME, MY_ARTICLES } from './routes';
import {
  IAppConfig,
  IntegrationRegistrationOptions,
  MenuItemAreaType,
  MenuItemType,
  LogoTypeSource,
} from '@akashaorg/typings/ui';

export const register: (opts: IntegrationRegistrationOptions) => IAppConfig = opts => ({
  loadingFn: () => import('./components'),
  mountsIn: opts.layoutConfig?.pluginSlotId,
  logo: { type: LogoTypeSource.ICON, value: 'article' },
  i18nNamespace: ['app-articles'],
  routes: {
    ...routes,
  },
  menuItems: {
    label: 'Articles',
    type: MenuItemType.App,
    logo: { type: LogoTypeSource.ICON, value: 'article' },
    area: [MenuItemAreaType.UserAppArea],
    subRoutes: [
      {
        label: HOME,
        index: 0,
        route: routes[HOME],
        type: MenuItemType.Internal,
      },
      {
        label: MY_ARTICLES,
        index: 1,
        route: routes[MY_ARTICLES],
        type: MenuItemType.Internal,
      },
    ],
  },
  extends: (matcher, loader) => {
    matcher({
      'manage-collaborators': loader(() => import('./extensions/manage-collaborators-modal')),
    });
  },
});