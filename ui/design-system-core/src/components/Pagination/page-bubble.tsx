import React from 'react';

import Box from '../Box';
import Button from '../Button';
import Text from '../Text';

export type PageBubbleProps = {
  isActive: boolean;
  page: number;
  onClickPage: (page: number) => () => void;
};

const PageBubble: React.FC<PageBubbleProps> = props => {
  const { isActive, page, onClickPage } = props;

  const basePageWrapperStyle = 'flex items-center justify-center w-8 h-8 rounded-full';

  const activePageWrapperBg = 'bg-(secondaryLight dark:secondaryDark)';

  const regularPageWrapperBg = 'bg-(grey8 dark:grey3)';
  return (
    <Button plain={true} onClick={onClickPage(page)}>
      <Box
        customStyle={`${basePageWrapperStyle} ${
          isActive ? activePageWrapperBg : regularPageWrapperBg
        }`}
      >
        <Text
          variant="body2"
          weight="bold"
          color={{
            light: isActive ? 'white' : 'black',
            dark: isActive ? 'black' : 'white',
          }}
        >
          {page}
        </Text>
      </Box>
    </Button>
  );
};

export default PageBubble;