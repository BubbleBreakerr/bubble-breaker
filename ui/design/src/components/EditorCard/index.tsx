import React from 'react';
import { MainAreaCardBox } from '../EntryCard/basic-card-box';
import EditorBox, { IEditorBox } from '../Editor';
import { Box, Text } from 'grommet';
import Icon from '../Icon';

export interface IEditorCard extends IEditorBox {
  className?: string;
  newPostLabel?: string;
  style?: React.CSSProperties;
  handleNavigateBack: () => void;
}

const EditorCard: React.FC<IEditorCard> = props => {
  const {
    className,
    avatar,
    ethAddress,
    postLabel,
    newPostLabel,
    placeholderLabel,
    emojiPlaceholderLabel,
    onPublish,
    handleNavigateBack,
    getMentions,
    getTags,
    mentions,
    tags,
    uploadRequest,
    embedEntryData,
    editorState,
    setEditorState,
  } = props;

  return (
    <MainAreaCardBox className={className} style={props.style}>
      <Box direction="row" justify="between" pad="medium" align="center" flex={false}>
        <Icon
          type="arrowLeft"
          onClick={handleNavigateBack}
          clickable={true}
          primaryColor={true}
          size="xs"
        />
        <Text size="large">{newPostLabel}</Text>
        <Icon type="akasha" clickable={true} style={{ marginLeft: '2rem' }} />
      </Box>
      <EditorBox
        avatar={avatar}
        ethAddress={ethAddress}
        onPublish={onPublish}
        postLabel={postLabel}
        withMeter={true}
        placeholderLabel={placeholderLabel}
        emojiPlaceholderLabel={emojiPlaceholderLabel}
        minHeight={'192px'}
        getMentions={getMentions}
        getTags={getTags}
        mentions={mentions}
        tags={tags}
        uploadRequest={uploadRequest}
        embedEntryData={embedEntryData}
        editorState={editorState}
        setEditorState={setEditorState}
      />
    </MainAreaCardBox>
  );
};

EditorCard.defaultProps = {
  newPostLabel: 'New Post',
};

export default EditorCard;