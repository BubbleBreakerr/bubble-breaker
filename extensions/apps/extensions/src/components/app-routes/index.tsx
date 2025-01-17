import React from 'react';
import AppsPage from '../pages/apps-page';
import ExplorePage from '../pages/explore-page';
import InfoPage from '../pages/info-page';
import MainPage from '../pages/main-page';
import MyAppsPage from '../pages/my-apps-page';
import MyWidgetsPage from '../pages/my-widgets-page';
import ErrorComponent from './error-component';
import routes, { EXPLORE, MY_APPS, MY_WIDGETS, APPS, INFO } from '../../routes';
import {
  Outlet,
  createRootRouteWithContext,
  createRoute,
  createRouter,
  redirect,
} from '@tanstack/react-router';

import { CreateRouter, RouterContext } from '@akashaorg/typings/lib/ui';

const rootRoute = createRootRouteWithContext<RouterContext>()({
  component: Outlet,
});

const defaultRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  beforeLoad: () => {
    throw redirect({ to: routes[EXPLORE], replace: true });
  },
});

const mainRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: `main`,
  component: MainPage,
});

const exploreRoute = createRoute({
  getParentRoute: () => mainRoute,
  path: `${routes[EXPLORE]}`,
  component: ExplorePage,
});

const appsRoute = createRoute({
  getParentRoute: () => mainRoute,
  path: `${routes[APPS]}`,
  component: AppsPage,
});

const myAppsRoute = createRoute({
  getParentRoute: () => mainRoute,
  path: `${routes[MY_APPS]}`,
  component: MyAppsPage,
});

const myWidgetsRoute = createRoute({
  getParentRoute: () => mainRoute,
  path: `${routes[MY_WIDGETS]}`,
  component: MyWidgetsPage,
});

const infoRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: `$appId${routes[INFO]}`,
  component: () => {
    const { appId } = infoRoute.useParams();
    return <InfoPage appId={appId} />;
  },
});

const routeTree = rootRoute.addChildren([
  defaultRoute,
  mainRoute.addChildren([exploreRoute, appsRoute, myAppsRoute, myWidgetsRoute]),
  infoRoute,
]);

export const router = ({ baseRouteName, apolloClient }: CreateRouter) =>
  createRouter({
    routeTree,
    basepath: baseRouteName,
    context: {
      apolloClient,
    },
    defaultErrorComponent: ({ error }) => (
      <ErrorComponent error={(error as unknown as Error).message} />
    ),
  });
