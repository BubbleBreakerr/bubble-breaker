import * as React from 'react';
import { Box, BoxProps } from 'grommet';
import { EditorPlaceholder } from './editor-placeholder';
import EditorBox, { IEditorBox } from '../Editor';
import { editorDefaultValue } from '../Editor/initialValue';
import { useOnClickAway } from '../../utils/clickAway';
import isEqual from 'lodash.isequal';
import { IPublishData } from '@akashaorg/typings/ui';

type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

export type CommentEditorProps = Optional<IEditorBox, 'setEditorState'> & {
  isShown?: boolean;
  borderBottomOnly?: boolean;
  noBorderRound?: boolean;
  background?: BoxProps['background'];
};

const CommentEditor: React.FC<CommentEditorProps> = props => {
  const {
    ethAddress,
    avatar,
    postLabel,
    placeholderLabel,
    emojiPlaceholderLabel,
    disablePublishLabel,
    disablePublish,
    onPublish,
    linkPreview,
    getLinkPreview,
    getMentions,
    getTags,
    mentions,
    tags,
    uploadRequest,
    isShown = false,
    showCancelButton,
    cancelButtonLabel,
    onCancelClick,
    editorState = editorDefaultValue,
    onPlaceholderClick,
    embedEntryData,
    setEditorState,
    showDraft,
    uploadedImages,
    borderBottomOnly,
    noBorderRound,
  } = props;

  const [showEditor, setShowEditor] = React.useState(isShown);
  const wrapperRef: React.RefObject<HTMLDivElement> = React.useRef(null);
  const editorRef = React.useRef(null);

  const handleClickAway = () => {
    if (
      showEditor &&
      isEqual(editorState, editorDefaultValue) &&
      !editorRef.current?.getPopoversState() &&
      !editorRef.current?.getUploadingState() &&
      !editorRef.current?.getImagesState()
    ) {
      setShowEditor(false);
    }
  };

  const handlePublish = (data: IPublishData) => {
    onPublish(data);
    setShowEditor(false);
  };

  useOnClickAway(wrapperRef, handleClickAway);

  const handleToggleEditor = (ev: React.SyntheticEvent) => {
    ev.stopPropagation();
    if (onPlaceholderClick) {
      onPlaceholderClick();
    }
    setShowEditor(!showEditor);
  };

  return (
    <Box ref={wrapperRef}>
      {!showEditor && (
        <EditorPlaceholder
          onClick={handleToggleEditor}
          ethAddress={ethAddress}
          avatar={avatar}
          placeholderLabel={placeholderLabel}
        />
      )}
      {showEditor && (
        <Box
          border={{ side: borderBottomOnly ? 'bottom' : 'all', size: '1px', color: 'border' }}
          pad="xxsmall"
          round={noBorderRound ? false : 'xsmall'}
          background={props.background}
        >
          <EditorBox
            ref={editorRef}
            avatar={avatar}
            ethAddress={ethAddress}
            postLabel={postLabel}
            placeholderLabel={placeholderLabel}
            emojiPlaceholderLabel={emojiPlaceholderLabel}
            disablePublishLabel={disablePublishLabel}
            disablePublish={disablePublish}
            onPublish={handlePublish}
            linkPreview={linkPreview}
            getLinkPreview={getLinkPreview}
            getMentions={getMentions}
            getTags={getTags}
            mentions={mentions}
            tags={tags}
            uploadRequest={uploadRequest}
            uploadedImages={uploadedImages}
            withMeter={true}
            editorState={editorState}
            setEditorState={value => {
              if (setEditorState) setEditorState(value);
            }}
            cancelButtonLabel={cancelButtonLabel}
            onCancelClick={onCancelClick}
            showCancelButton={showCancelButton}
            embedEntryData={embedEntryData}
            showDraft={showDraft}
          />
        </Box>
      )}
    </Box>
  );
};

export { CommentEditor };
