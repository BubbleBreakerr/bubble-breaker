import { Box, Text } from 'grommet';
import * as React from 'react';
import { Icon } from '../../Icon/index';
import { FormLinkInput } from '../../Input/index';
import {
  StyledBox,
  StyledDeleteBox,
  StyledDrop,
  StyledImageInput,
} from './styled-form-image-popover';

export interface IFormImagePopover {
  uploadLabel: string;
  urlLabel: string;
  deleteLabel: string;
  target: HTMLElement;
  closePopover: () => void;
  insertImage: (url: string) => void;
  currentImage?: boolean;
  handleDeleteImage: () => void;
}

const FormImagePopover: React.FC<IFormImagePopover> = props => {
  const {
    uploadLabel,
    urlLabel,
    deleteLabel,
    target,
    closePopover,
    insertImage,
    currentImage,
    handleDeleteImage,
  } = props;

  const [linkInputActive, setLinkInputActive] = React.useState(false);
  const [linkInputValue, setLinkInputValue] = React.useState('');

  const uploadInputRef: React.RefObject<HTMLInputElement> = React.useRef(null);

  const handleLinkInputSave = () => {
    // @Todo check if isUrl and isImage
    insertImage(linkInputValue);
    closePopover();
  };

  const handleDeleteClick = () => {
    handleDeleteImage();
    closePopover();
  };

  const handleLinkInputChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setLinkInputValue(ev.target.value);
  };

  const handleUploadInputClick = () => {
    if (uploadInputRef.current) {
      uploadInputRef.current.click();
    }
    return;
  };

  const handleFileUpload = (ev: React.ChangeEvent<HTMLInputElement>) => {
    if (!(ev.target.files && ev.target.files[0])) {
      return;
    }
    const file = ev.target.files[0];
    const fileReader = new FileReader();
    fileReader.addEventListener('load', () => {
      const result = fileReader.result as string;
      insertImage(result);
      closePopover();
    });
    fileReader.readAsDataURL(file);
  };

  return (
    <StyledDrop
      target={target}
      align={{ top: 'bottom', left: 'left' }}
      onClickOutside={closePopover}
      onEsc={closePopover}
    >
      <Box direction="column" pad="xsmall">
        <StyledBox
          pad={{ left: 'xxsmall' }}
          align="center"
          direction="row"
          gap="xsmall"
          onClick={handleUploadInputClick}
        >
          <Icon type="upload" />
          <Text>{uploadLabel}</Text>
          <StyledImageInput onChange={handleFileUpload} type="file" ref={uploadInputRef} />
        </StyledBox>
        {!linkInputActive && (
          <StyledBox
            pad={{ left: 'xxsmall' }}
            align="center"
            direction="row"
            gap="xsmall"
            onClick={() => {
              setLinkInputActive(true);
            }}
          >
            <Icon type="link" />
            <Text>{urlLabel}</Text>
          </StyledBox>
        )}
        {linkInputActive && (
          <FormLinkInput
            onClick={handleLinkInputSave}
            onChange={handleLinkInputChange}
            inputValue={linkInputValue}
          />
        )}
        {currentImage && (
          <StyledDeleteBox
            pad={{ left: 'xxsmall' }}
            align="center"
            direction="row"
            gap="xsmall"
            onClick={handleDeleteClick}
          >
            <Icon type="trash" />
            <Text>{deleteLabel}</Text>
          </StyledDeleteBox>
        )}
      </Box>
    </StyledDrop>
  );
};

export { FormImagePopover };