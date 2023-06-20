import * as React from 'react';
import { act, fireEvent } from '@testing-library/react';
import ProfileAvatarButton from '../';
import { customRender } from '../../../test-utils';

describe('<ProfileAvatarButton /> Component', () => {
  let componentWrapper = customRender(<></>, {});

  const info = 'info';
  const label = 'label';

  const profileId = 'profileId';

  const avatar = {
    default: {
      height: 320,
      src: '',
      width: 320,
    },
  };

  const handleClick = jest.fn(/** */);
  const handleClickAvatar = jest.fn(/** */);
  const handleMouseEnter = jest.fn(/** */);
  const handleMouseLeave = jest.fn(/** */);

  beforeEach(() => {
    act(() => {
      componentWrapper = customRender(
        <ProfileAvatarButton
          info={info}
          label={label}
          avatarImage={avatar}
          profileId={profileId}
          onClick={handleClick}
          onClickAvatar={handleClickAvatar}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />,
        {},
      );
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    expect(componentWrapper).toBeDefined();
  });

  it('shows info and label', () => {
    const { getByText } = componentWrapper;

    const infoLabel = getByText(info);
    const labelText = getByText(label);

    expect(infoLabel).toBeDefined();
    expect(labelText).toBeDefined();
  });

  it('calls avatar handler', () => {
    const { getByTitle } = componentWrapper;

    const avatarBox = getByTitle('avatar-box');
    expect(avatarBox.childNodes[0]).toBeDefined();
    expect(handleClickAvatar).toBeCalledTimes(0);

    fireEvent.click(avatarBox.childNodes[0]);

    expect(handleClickAvatar).toBeCalledTimes(1);
  });

  it('calls info handlers', () => {
    const { getByTitle } = componentWrapper;

    const infoBox = getByTitle('info-box');
    expect(infoBox).toBeDefined();
    expect(handleClick).toBeCalledTimes(0);
    expect(handleMouseEnter).toBeCalledTimes(0);
    expect(handleMouseLeave).toBeCalledTimes(0);

    fireEvent.mouseEnter(infoBox);
    expect(handleMouseEnter).toBeCalledTimes(1);

    fireEvent.click(infoBox);
    expect(handleClick).toBeCalledTimes(1);

    fireEvent.mouseLeave(infoBox);
    expect(handleMouseLeave).toBeCalledTimes(1);
  });
});