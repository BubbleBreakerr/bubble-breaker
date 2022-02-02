import React from 'react';
import moment from 'moment';
import DS from '@akashaproject/design-system';
import getSDK from '@akashaproject/awf-sdk';

import { IContentProps } from '../../../interfaces';

import EntryDataCard from './entry-data-card';
import ExplanationsBox from './explanations-box';

const { Box, Button, Text, Avatar, styled, useViewportSize } = DS;

const StyledBox = styled(Box)`
  background-color: ${props => props.theme.colors.accentLight};
`;

const ContentCardButton = styled(Button)`
  height: auto;
  padding: 0.3rem 0.6rem;
  border-width: 0.1rem;
`;

const Content: React.FC<IContentProps> = props => {
  const [showExplanations, setShowExplanations] = React.useState<boolean>(false);

  const { size } = useViewportSize();

  const sdk = getSDK();
  const ipfsGateway = sdk.services.common.ipfs.getSettings().gateway;

  const isMobile = size === 'small';

  const handleClick = () => {
    if (props.entryId) {
      props.handleButtonClick(props.entryId, props.itemType);
    }
  };

  const textStyle = { fontSize: '1rem', fontWeight: 600 };

  return (
    <Box pad="1rem">
      {props.entryData && (
        <EntryDataCard
          modalSlotId={props.layoutConfig.modalSlotId}
          entryData={props.entryData}
          itemType={props.itemType}
          locale={props.locale}
          singleSpa={props.singleSpa}
        />
      )}
      <Box
        direction="row"
        margin={{ top: props.isPending ? 'large' : 'medium' }}
        wrap={true}
        align="center"
      >
        <Text margin={{ left: '0.2rem', bottom: '0.2rem' }} style={textStyle}>{`${
          props.itemType && props.itemType[0].toUpperCase()
        }${props.itemType.slice(1)} ${props.reportedLabel}  ${props.forLabel}`}</Text>

        {props.reasons.map((reason, idx) => (
          <React.Fragment key={idx}>
            {/* show 'and' at the appropriate position, if more than one reason */}
            {props.reasons.length > 1 && idx === props.reasons.length - 1 && (
              <Text margin={{ left: '0.2rem', bottom: '0.2rem' }} style={textStyle}>
                {props.andLabel}
              </Text>
            )}
            <StyledBox
              margin={{ left: '0.2rem', bottom: '0.2rem' }}
              pad={{ horizontal: '0.2rem' }}
              round={'0.125rem'}
            >
              <Text as="span" color="accentText" style={textStyle}>
                {reason}
              </Text>
            </StyledBox>
          </React.Fragment>
        ))}
      </Box>

      <Text
        as="a"
        color="accentText"
        margin={{ top: 'large' }}
        style={{ cursor: 'pointer' }}
        onClick={() => setShowExplanations(!showExplanations)}
      >
        {showExplanations ? props.hideExplanationsLabel : props.showExplanationsLabel}
      </Text>
      {showExplanations && (
        <ExplanationsBox
          entryId={props.entryId}
          reportedByLabel={props.reportedByLabel}
          forLabel={props.forLabel}
          logger={props.logger}
        />
      )}
      <Box
        direction={isMobile ? 'column' : 'row'}
        margin={{ top: 'medium' }}
        pad={{ top: props.isPending ? 'medium' : '0rem' }}
        align="center"
        border={
          props.isPending ? { side: 'top', color: 'border', style: 'solid' } : { size: '0rem' }
        }
      >
        <Box width={props.isPending && !isMobile ? '70%' : '100%'}>
          <Box direction="row" align="center" wrap={true}>
            <Text margin={{ right: '0.2rem' }}>{props.originallyReportedByLabel}</Text>
            <Avatar
              ethAddress={props.reporter || ''}
              src={
                props.reporterAvatar
                  ? `${ipfsGateway}/${props.reporterAvatar}`
                  : props.reporterAvatar
              }
              size="xs"
              margin={{ right: '0.2rem' }}
              backgroundColor={'lightBackground'}
              border="sm"
            />
            {props.reporter && !props.reporterName && (
              <Text margin={{ right: '0.2rem' }} color="accentText">
                {`${props.reporter.slice(0, 6)}...${props.reporter.slice(
                  props.reporter.length - 4,
                )}`}
              </Text>
            )}
            {props.reporterName && (
              <Text margin={{ right: '0.2rem' }} color="accentText">
                {props.reporterName}
              </Text>
            )}
            {props.reporterENSName && (
              <Text
                margin={{ right: '0.2rem' }}
                color={!props.isPending ? 'secondaryText' : 'initial'}
              >
                {`(@${props.reporterENSName})`}
              </Text>
            )}
            {props.otherReporters && !!props.otherReporters.length && (
              <>
                <Text margin={{ right: '0.2rem' }}>{props.andLabel}</Text>
                <Text margin={{ right: '0.2rem' }} color="accentText">
                  {props.otherReporters}
                </Text>
              </>
            )}
          </Box>
          <Text color="secondaryText">{`${props.reportedOnLabel} ${moment(
            props.reportedDateTime,
          ).format('D MMM yyyy・h:mm a')}`}</Text>
        </Box>
        {props.isPending && (
          <Box
            direction="row"
            width={isMobile ? '100%' : '30%'}
            margin={isMobile ? 'small' : '0rem'}
            justify="end"
          >
            <ContentCardButton
              primary={true}
              label={props.makeADecisionLabel}
              onClick={handleClick}
            />
          </Box>
        )}
      </Box>
      {!props.isPending && (
        <Box margin={{ top: 'medium' }} border={{ side: 'top', color: 'border', style: 'solid' }}>
          <Text margin={{ top: 'large' }} style={{ fontWeight: 'bold' }}>
            {props.determinationLabel}
            {': '}
            <Text as="span" color="accentText">
              {props.determination}
            </Text>
          </Text>
          <Text margin={{ top: 'xsmall' }}>{props.moderatorDecision}</Text>
          <Box
            direction={isMobile ? 'column' : 'row'}
            margin={{ top: 'large' }}
            align={isMobile ? 'start' : 'center'}
          >
            <Box width={!isMobile ? '70%' : '100%'} wrap={true}>
              <Text>
                {props.moderator && !props.moderatorName
                  ? `${props.moderatedByLabel} ${props.moderator.slice(
                      0,
                      6,
                    )}...${props.moderator.slice(
                      props.moderator.length - 5,
                      props.moderator.length - 1,
                    )}`
                  : `${props.moderatedByLabel} ${props.moderatorName} ${
                      props.moderatorENSName ? `(@${props.moderatorENSName})` : ''
                    }`}
              </Text>
              <Text color="secondaryText">{`${props.moderatedOnLabel} ${moment(
                props.evaluationDateTime,
              ).format('D MMM yyyy・h:mm a')}`}</Text>
            </Box>
            <Box
              direction="row"
              margin={isMobile ? 'small' : '0rem'}
              width={isMobile ? '100%' : '30%'}
              justify="end"
            >
              <ContentCardButton label={props.reviewDecisionLabel} onClick={handleClick} />
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Content;