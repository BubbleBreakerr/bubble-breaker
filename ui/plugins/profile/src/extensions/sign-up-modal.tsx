import * as React from 'react';
import singleSpaReact from 'single-spa-react';
import ReactDOM from 'react-dom';
import { RootComponentProps } from '@akashaproject/ui-awf-typings';
import { useTranslation } from 'react-i18next';
import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import DS from '@akashaproject/design-system';
import { useLoginState, useErrors, withProviders } from '@akashaproject/ui-awf-hooks';
import getSDK from '@akashaproject/awf-sdk';
import { lastValueFrom } from 'rxjs';

const { SignUpModal } = DS;

const SignUpModalContainer = (props: RootComponentProps) => {
  const { t } = useTranslation();
  const location = useLocation();

  const sdk = getSDK();

  const { logger } = props;

  const [inviteToken, setInviteToken] = React.useState<string | null>(null);
  const [, errorActions] = useErrors({ logger });

  const [loginState] = useLoginState({
    onError: errorActions.createError,
  });

  const [inviteTokenForm, setinviteTokenForm] = React.useState<{
    submitted: boolean;
    submitting: boolean;
    success: boolean;
    hasError: boolean;
    errorMsg: string;
  }>({
    submitted: false,
    submitting: false,
    success: false,
    hasError: false,
    errorMsg: '',
  });
  const [termsState, setTermsState] = React.useState<{
    waitForCheckTerms: boolean;
    checkedTermsValues: string[];
    acceptedTerms: boolean;
  }>({
    waitForCheckTerms: true,
    checkedTermsValues: [],
    acceptedTerms: false,
  });

  React.useEffect(() => {
    if (loginState.ethAddress) {
      setTimeout(() => handleSignUpModalClose(), 500);
    }
  }, [loginState.ethAddress]);

  const _handleModalClose = () => {
    setInviteToken(null);
    errorActions.removeLoginErrors();
  };

  const onInputTokenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setinviteTokenForm({
      submitted: false,
      submitting: false,
      success: false,
      hasError: false,
      errorMsg: '',
    });
    setInviteToken(e.target.value);
  };
  const triggerInviteValidation = () => {
    if (inviteToken?.length && inviteToken?.length === 24) {
      checkIsValidToken();
    }
  };
  const checkIsValidToken = () => {
    setinviteTokenForm({
      submitted: false,
      submitting: true,
      success: false,
      hasError: false,
      errorMsg: '',
    });
    lastValueFrom(sdk.api.auth.validateInvite(inviteToken))
      .then(() => {
        setinviteTokenForm({
          submitted: true,
          submitting: false,
          success: true,
          hasError: false,
          errorMsg: '',
        });
      })
      .catch((err: Error) => {
        setinviteTokenForm({
          submitted: true,
          submitting: false,
          success: false,
          hasError: true,
          errorMsg: err.message,
        });
      });
  };

  const validateTokenFn = (e: any) => {
    e.preventDefault();
    checkIsValidToken();
  };

  const onCheckedTermsValues = (e: any) => {
    setTermsState(prevState => {
      return {
        ...prevState,
        checkedTermsValues: e.value,
      };
    });
  };
  const onAcceptTerms = (_: any) => {
    setTermsState(prevState => {
      return {
        ...prevState,
        acceptedTerms: true,
      };
    });
    localStorage.setItem('@acceptedTermsAndPrivacy', new Date().toISOString());
    props.navigateToModal({ name: 'signin' });
  };
  const activateAcceptButton = () => {
    setTermsState(prevState => {
      return {
        ...prevState,
        waitForCheckTerms: !(termsState.checkedTermsValues.length === 2),
      };
    });
  };
  React.useEffect(() => {
    setInviteToken(localStorage.getItem('@signUpToken'));
  }, []);
  React.useEffect(triggerInviteValidation, [inviteToken]);
  React.useEffect(activateAcceptButton, [termsState.checkedTermsValues]);

  const handleSignUpModalClose = () => {
    props.singleSpa.navigateToUrl(location.pathname);
    _handleModalClose();
    errorActions.removeLoginErrors();
  };

  return (
    <SignUpModal
      inviteToken={inviteToken}
      submitted={inviteTokenForm.submitted}
      submitting={inviteTokenForm.submitting}
      success={inviteTokenForm.success}
      hasError={inviteTokenForm.hasError}
      errorMsg={inviteTokenForm.errorMsg}
      onModalClose={handleSignUpModalClose}
      subtitleLabel={t('Please enter your invitation code')}
      headerLabel={t('Sign Up')}
      onChange={onInputTokenChange}
      validateTokenFn={validateTokenFn}
      onAcceptTerms={onAcceptTerms}
      onCheckedTermsValues={onCheckedTermsValues}
      waitForCheckTerms={termsState.waitForCheckTerms}
      checkedTermsValues={termsState.checkedTermsValues}
      acceptedTerms={termsState.acceptedTerms}
    />
  );
};

const Wrapped = (props: RootComponentProps) => (
  <Router>
    <React.Suspense fallback={<></>}>
      <SignUpModalContainer {...props} />
    </React.Suspense>
  </Router>
);

const reactLifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: withProviders(Wrapped),
  errorBoundary: (err, errorInfo, props) => {
    if (props.logger) {
      props.logger('Error: %s; Info: %s', err, errorInfo);
    }
    return <div>!</div>;
  },
});

export const bootstrap = reactLifecycles.bootstrap;

export const mount = reactLifecycles.mount;

export const unmount = reactLifecycles.unmount;