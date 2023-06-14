import * as React from 'react';
import { act, cleanup } from '@testing-library/react';

import ChatAreaHeader from '..';

import { customRender } from '@akashaorg/design-system-core/lib/test-utils';

describe('<ChatAreaHeader /> Component', () => {
  let componentWrapper = customRender(<></>, {});

  const name = 'Estelle Collier';
  const username = 'estellecollier';

  const handleClickAvatar = jest.fn();

  beforeEach(() => {
    act(() => {
      componentWrapper = customRender(
        <ChatAreaHeader
          name={name}
          avatar={{ default: { src: 'https://placebeard.it/360x360', width: 360, height: 360 } }}
          did={{ id: '0x003410490050000320006570034567114572000' }}
          onClickAvatar={handleClickAvatar}
        />,

        {},
      );
    });
  });

  afterEach(() => {
    act(() => componentWrapper.unmount());
    cleanup();
  });

  it('renders correctly', () => {
    expect(componentWrapper).toBeDefined();
  });

  it("has correct chat owner's details", () => {
    const { getByText } = componentWrapper;
    const fullName = getByText(name);

    expect(fullName).toBeDefined();
  });
});