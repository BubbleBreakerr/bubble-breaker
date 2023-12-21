import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useGetLogin, useRootComponentProps } from '@akashaorg/ui-awf-hooks';

import { GenerateMessage, KeyConfirmation } from '../components/onboarding';

import menuRoute, { DEV_KEYS } from '../routes';

export const AddDevKey: React.FC<unknown> = () => {
  const { t } = useTranslation('app-dev-dashboard');
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [messageName] = useState<string>('');
  const [message] = useState<string>('');

  const { data } = useGetLogin();
  const authenticatedDID = data?.id;

  const { getRoutingPlugin } = useRootComponentProps();

  const navigateTo = getRoutingPlugin().navigateTo;

  const validateMutation = { isSuccess: false, data: null, isError: false, error: null };

  // @TODO: needs update
  const addKeyMutation = {
    isSuccess: false,
    data: null,
    isError: false,
    error: null,
    mutate: _args => _args,
  };

  useEffect(() => {
    // add key after validating
    if (validateMutation.isSuccess && validateMutation.data?.body?.aud === authenticatedDID) {
      addKeyMutation.mutate({ message, messageName });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [validateMutation.isSuccess]);

  const stepLabels = ['sign_message', 'key_confirmation'];

  const handleCancelClick = () => {
    navigateTo?.({
      appName: '@akashaorg/app-dev-dashboard',
      getNavigationUrl: () => menuRoute[DEV_KEYS],
    });
  };

  const handleConfirmClick = () => {
    setActiveIndex(1);
  };

  const handleFinishAddingKey = () => {
    // navigate to developer profile
    navigateTo?.({
      appName: '@akashaorg/app-dev-dashboard',
      getNavigationUrl: () => menuRoute[DEV_KEYS],
    });
  };

  return (
    <>
      {activeIndex === 0 && (
        <GenerateMessage
          stepLabels={stepLabels}
          activeIndex={activeIndex}
          titleLabel={t('Generating Your First Message')}
          footerCTALabel={t('How to generate a new message?')}
          footerCTAUrl="https://akasha-docs.pages.dev"
          messageNameTitleLabel={t('Message name')}
          messageNameInputPlaceholder={t('Give your message a name (optional)')}
          messageTitleLabel={t('Message')}
          messageInputPlaceholder={t('Paste the generated message here')}
          validationStatus={{
            isError: validateMutation.isError,
            errorMessage: t('{{error}}', { error: validateMutation.error?.message || '' }),
          }}
          cancelButtonLabel={t('Cancel')}
          confirmButtonLabel={t('Validate Message')}
          onCancelButtonClick={handleCancelClick}
          onConfirmButtonClick={handleConfirmClick}
        />
      )}

      {activeIndex === 1 && (
        <KeyConfirmation
          stepLabels={stepLabels}
          activeIndex={activeIndex}
          titleLabel={t('Key Confirmation')}
          subtitleLabel={t('Please confirm your key before you add it')}
          assetName="key-confirmation"
          nonameLabel={t('Unnamed Key')}
          unusedLabel={t('Unused')}
          usedLabel={t('Used')}
          pendingConfirmationLabel={t('Pending Confirmation')}
          devPublicKeyLabel={t('Dev Public Key 🔑')}
          dateAddedLabel={t('Date added 🗓')}
          confirmButtonLabel={t('Confirm')}
          onConfirmButtonClick={handleFinishAddingKey}
        />
      )}
    </>
  );
};
