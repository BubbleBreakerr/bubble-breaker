import React from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import DS from '@akashaorg/design-system';
import { RootComponentProps } from '@akashaorg/typings/ui';

import { values } from '../services/values';
import { externalLinks } from '../utils/external-links';

const { ModerationValueCard } = DS;

const ValuePage: React.FC<RootComponentProps> = () => {
  const { t } = useTranslation('app-moderation-ewa');

  const { value } = useParams();

  const activeValue = values.find(v => v.path === value);

  return (
    <ModerationValueCard
      label={t('{{label}}', { label: activeValue.title })}
      assetName={activeValue.assetName}
      description={t('{{description}}', { description: activeValue.description })}
      ctaLabel={t('Discuss this value')}
      ctaUrl={externalLinks.discourse.values}
    />
  );
};

export default ValuePage;