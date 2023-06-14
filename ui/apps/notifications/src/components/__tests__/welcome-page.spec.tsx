import * as React from 'react';
import WelcomePage from '../newComponents/WelcomePage';

import { screen, renderWithAllProviders, act, genAppProps } from '@akashaorg/af-testing';

describe('< WelcomePage /> component', () => {
  const BaseComponent = (
    <WelcomePage
      header="Welcome to the Notification App"
      description="Get the latest updates about what’s going on with your world. You can personalize your notifications and get only what you want to see!"
      leftButtonLabel="Skip"
      rightButtonLabel="Customize your notifications"
      {...genAppProps()}
    />
  );
  beforeEach(async () => {
    await act(async () => {
      renderWithAllProviders(BaseComponent, {});
    });
  });

  it("should render the notifications app's welcome page", async () => {
    expect(screen.getByText(/Welcome to the Notification App/)).toBeInTheDocument();
  });
});