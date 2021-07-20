import * as React from 'react';
import { useDropzone } from 'react-dropzone';
import { StyledInputDiv, StyledImageInput, StyledText } from './styled-image-popover';

export interface IDropzone {
  onDrop: (acceptedFiles: File[]) => void;
  accept: string;
  dropzoneLabel?: string;
  testId?: string;
}

export const Dropzone: React.FC<IDropzone> = props => {
  const { onDrop, accept, dropzoneLabel, testId } = props;
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept,
    multiple: false,
  });

  return (
    <StyledInputDiv {...getRootProps()}>
      <StyledText size="medium" color="secondaryText">
        {dropzoneLabel}
      </StyledText>
      <StyledImageInput {...getInputProps()} data-testid={testId} />
    </StyledInputDiv>
  );
};