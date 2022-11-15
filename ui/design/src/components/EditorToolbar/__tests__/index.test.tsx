import React from 'react';
import userEvent from '@testing-library/user-event';
import { act, cleanup } from '@testing-library/react';

import EditorToolbar from '..';

import { customRender, wrapWithTheme } from '../../../test-utils';

describe('<EditorToolbar /> Component', () => {
  let componentWrapper = customRender(<></>, {});

  const handleDropClose = jest.fn();
  const handleDropOpen = jest.fn();
  const handleIconClick = jest.fn();
  const handleBoldClick = jest.fn();
  const handleItalicClick = jest.fn();
  const handleUnderlineClick = jest.fn();
  const handleStrikeThroughClick = jest.fn();

  beforeEach(() => {
    act(() => {
      componentWrapper = customRender(
        wrapWithTheme(
          <EditorToolbar
            dropOpen={null}
            caseStyle="textcaseSentence"
            listStyle="listNumbered"
            alignStyle="alignRight"
            wrapperBorder={{ side: 'horizontal', color: 'border' }}
            closeDrop={handleDropClose}
            onDropOpen={handleDropOpen}
            onIconClick={handleIconClick}
            onBoldClick={handleBoldClick}
            onItalicClick={handleItalicClick}
            onUnderlineClick={handleUnderlineClick}
            onStrikeThroughClick={handleStrikeThroughClick}
          />,
        ),
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

  it('appropriately handles clicks on the toolbar', async () => {
    const { getByTestId } = componentWrapper;

    const emojiIcon = getByTestId('emoji-icon');
    expect(emojiIcon).toBeDefined();
    expect(handleDropOpen).toBeCalledTimes(0);

    await userEvent.click(emojiIcon);

    expect(handleDropOpen).toBeCalledTimes(1);
  });
});