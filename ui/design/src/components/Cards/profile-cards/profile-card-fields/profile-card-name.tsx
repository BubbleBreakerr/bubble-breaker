import { Box, Text } from 'grommet';
import * as React from 'react';
import { AppIcon } from '../../../Icon/index';
import { SelectPopover } from '../../../Popovers/index';
import { IProfileDataProvider, IProfileProvidersData } from '../profile-card';

export interface IProfileCardNameProps {
  editable: boolean;
  name?: string;
  nameIcon?: string;
  namePopoverOpen: boolean;
  setNamePopoverOpen: (value: boolean) => void;
  handleChangeName: (provider: IProfileDataProvider) => void;
  profileProvidersData?: IProfileProvidersData;
}

const ProfileCardName: React.FC<IProfileCardNameProps> = props => {
  const {
    editable,
    name,
    nameIcon,
    namePopoverOpen,
    setNamePopoverOpen,
    profileProvidersData,
    handleChangeName,
  } = props;

  const editNameRef: React.RefObject<HTMLDivElement> = React.useRef(null);

  return (
    <>
      <Box direction="row" gap="xsmall">
        <Text size="xlarge" weight="bold" color="primaryText">
          {name}
        </Text>
        {editable &&
          profileProvidersData &&
          profileProvidersData.nameProviders &&
          profileProvidersData.nameProviders.length !== 0 && (
            <AppIcon
              ref={editNameRef}
              onClick={() => setNamePopoverOpen(true)}
              appImg={nameIcon}
              placeholderIconType="editSimple"
            />
          )}
      </Box>
      {editNameRef.current &&
        profileProvidersData &&
        profileProvidersData.nameProviders &&
        profileProvidersData.nameProviders.length !== 0 &&
        namePopoverOpen && (
          <SelectPopover
            currentValue={name}
            target={editNameRef.current}
            dataSource={profileProvidersData.nameProviders}
            onClickElem={handleChangeName}
            closePopover={() => {
              setNamePopoverOpen(false);
            }}
          />
        )}
    </>
  );
};

export default ProfileCardName;