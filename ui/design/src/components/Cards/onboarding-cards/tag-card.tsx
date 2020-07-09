import * as React from 'react';
import { ITag } from '../widget-cards/trending-widget-card';
import { SubtitleTextIcon } from '../../TextIcon';
import { Box } from 'grommet';
import { DuplexButton } from '../../Buttons';
import { IMentionData } from '../../Charts/area-chart';
import { ResponsiveChart } from '../../Charts/responsive-chart';
import { Icon } from '../../Icon';
import { useViewportSize } from '../../Providers/viewport-dimension';
import styled from 'styled-components';

const WrapperBox = styled(Box)`
  border-radius: ${props => props.theme.shapes.borderRadius};
`;

export interface ITagCard {
  tag: ITagData;
  mentionsLabel?: string;
  subscribeLabel?: string;
  subscribedLabel?: string;
  unsubscribeLabel?: string;
  handleSubscribe: (tagName: string) => void;
  handleUnsubscribe: (tagName: string) => void;
}

export interface ITagData extends ITag {
  tagHistoricData: IMentionData[];
  subscribed?: boolean;
}

const TagCard: React.FC<ITagCard> = props => {
  const {
    tag,
    mentionsLabel,
    subscribeLabel,
    unsubscribeLabel,
    subscribedLabel,
    handleSubscribe,
    handleUnsubscribe,
  } = props;

  const { size } = useViewportSize();

  const onSub = () => {
    handleSubscribe(tag.tagName);
  };

  const onUnsub = () => {
    handleUnsubscribe(tag.tagName);
  };

  const renderContent = () => {
    if (size === 'small') {
      return (
        <Box direction="column" align="center" pad={{ vertical: 'small' }}>
          <Box
            direction="row"
            justify="between"
            align="center"
            fill="horizontal"
            pad={{ top: 'small' }}
          >
            <SubtitleTextIcon
              label={tag.tagName}
              subtitle={`${tag.mentions} ${mentionsLabel}`}
              gap="xxsmall"
            />
            <Box width="8rem">
              <DuplexButton
                fill="horizontal"
                label={subscribeLabel}
                icon={<Icon type="subscribe" />}
                onClickActive={onSub}
                onClickInactive={onUnsub}
                inactiveLabel={subscribeLabel}
                activeLabel={subscribedLabel}
                activeHoverLabel={unsubscribeLabel}
                active={tag.subscribed}
              />
            </Box>
          </Box>
          <Box width="20rem" height="5.4rem">
            <ResponsiveChart data={tag.tagHistoricData} />
          </Box>
        </Box>
      );
    }
    return (
      <Box direction="row" justify="between" align="center">
        <SubtitleTextIcon
          label={tag.tagName}
          subtitle={`${tag.mentions} ${mentionsLabel}`}
          gap="xxsmall"
        />
        <Box basis="72%" justify="between" direction="row" align="center">
          <Box width="13rem" height="4.4rem">
            <ResponsiveChart data={tag.tagHistoricData} />
          </Box>
          <Box width="8rem">
            <DuplexButton
              fill="horizontal"
              label={subscribeLabel}
              icon={<Icon type="subscribe" />}
              onClickActive={onSub}
              onClickInactive={onUnsub}
              inactiveLabel={subscribeLabel}
              activeLabel={subscribedLabel}
              activeHoverLabel={unsubscribeLabel}
              active={tag.subscribed}
            />
          </Box>
        </Box>
      </Box>
    );
  };
  return (
    <WrapperBox
      background="ultraLightBackground"
      border={{ side: 'all', color: 'border', size: 'xsmall', style: 'solid' }}
      pad={{ horizontal: 'small' }}
      flex={{ shrink: 0 }}
      responsive={false}
    >
      {renderContent()}
    </WrapperBox>
  );
};

TagCard.defaultProps = {
  mentionsLabel: 'mentions',
  subscribeLabel: 'Subscribe',
  subscribedLabel: 'Subscribed',
  unsubscribeLabel: 'Unsubscribe',
};

export { TagCard };