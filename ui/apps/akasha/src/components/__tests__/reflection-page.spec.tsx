import React from 'react';
import ReflectionPage from '../pages/entry-page/reflection-page';
import * as hooks from '@akashaorg/ui-awf-hooks/lib/generated';

import {
  screen,
  renderWithAllProviders,
  act,
  genAppProps,
  genReflectionData,
} from '@akashaorg/af-testing';
import { AnalyticsProvider } from '@akashaorg/ui-awf-hooks/lib/use-analytics';
import { AkashaReflect } from '@akashaorg/typings/lib/sdk/graphql-types-new';

const mockLocationValue = {
  pathname: '/',
  search: '',
  hash: '',
  state: null,
};

const mockRouteParams = {
  beamId: 'kjzl6kcym7w8y7r2ej5n3oaq3l6bp4twqxmcvjoa3dlf86mvdb4vv7ryv1pkewr',
};

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useLocation: jest.fn().mockImplementation(() => {
    return mockLocationValue;
  }),
  useParams: jest.fn().mockImplementation(() => {
    return mockRouteParams;
  }),
}));

describe('< ReflectionPage /> component', () => {
  const BaseComponent = (
    <AnalyticsProvider {...genAppProps()}>
      <ReflectionPage />
    </AnalyticsProvider>
  );

  beforeEach(async () => {
    await act(async () => {
      renderWithAllProviders(BaseComponent, {});
    });
  });

  beforeAll(() => {
    (
      jest.spyOn(hooks, 'useGetReflectionByIdQuery') as unknown as jest.SpyInstance<{
        data: AkashaReflect;
        status: 'success' | 'error' | 'loading';
      }>
    ).mockReturnValue({ data: genReflectionData(), status: 'success' });
  });

  it('should render reflection page', async () => {
    expect(screen.getByText(/Back to original beam/i)).toBeInTheDocument();
    expect(screen.getByText(/Share your thoughts/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Reflect/i })).toBeInTheDocument();
  });
});