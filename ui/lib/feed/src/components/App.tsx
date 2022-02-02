import React from 'react';
import DS from '@akashaproject/design-system';
import EntryFeed from './entry-feed';
import ProfileFeed from './profile-feed';
import { RootComponentProps } from '@akashaproject/ui-awf-typings';
import { ItemTypes, ModalNavigationOptions } from '@akashaproject/ui-awf-typings/lib/app-loader';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n';
import { ILogger } from '@akashaproject/sdk-typings/lib/interfaces/log';
import { BrowserRouter } from 'react-router-dom';
import { IProfileData } from '@akashaproject/ui-awf-typings/lib/profile';
import { LoginState } from '@akashaproject/ui-awf-hooks/lib/use-login';
import { TrackEventData } from '@akashaproject/ui-awf-typings/lib/analytics';

const { ThemeSelector, lightTheme, darkTheme } = DS;

export interface EntryListPage {
  results: string[];
}

export interface IFeedWidgetProps {
  logger: ILogger;
  pages: EntryListPage[];
  itemType: ItemTypes;
  onLoadMore: () => void;
  getShareUrl?: (entryId: string) => string;
  loginState: LoginState;
  singleSpaNavigate: (url: string) => void;
  navigateToModal: (props: ModalNavigationOptions) => void;
  onLoginModalOpen: (redirectTo?: { modal: ModalNavigationOptions }) => void;
  requestStatus: 'success' | 'loading' | 'error' | 'idle';
  hasNextPage: boolean;
  loggedProfile?: IProfileData;
  contentClickable?: boolean;
  onEntryFlag: (entryId: string, itemType: string) => () => void;
  onEntryRemove?: (entryId: string) => void;
  parentIsProfilePage?: boolean;
  removeEntryLabel?: string;
  removedByMeLabel?: string;
  removedByAuthorLabel?: string;
  uiEvents: RootComponentProps['uiEvents'];
  itemSpacing?: number;
  i18n: typeof i18n;
  modalSlotId: string;
  trackEvent?: (eventData: Omit<TrackEventData, 'eventType'>) => void;
}

const FeedWidgetRoot: React.FC<IFeedWidgetProps> = props => {
  return (
    <BrowserRouter>
      <I18nextProvider i18n={props.i18n}>
        <ThemeSelector
          settings={{ activeTheme: 'Light-Theme' }}
          availableThemes={[lightTheme, darkTheme]}
          plain={true}
        >
          {props.itemType === ItemTypes.ENTRY && <EntryFeed {...props} />}
          {props.itemType === ItemTypes.COMMENT && <EntryFeed {...props} itemSpacing={0} />}
          {/* {props.itemType === ItemTypes.PROFILE && <ProfileFeed {...props} />} */}
        </ThemeSelector>
      </I18nextProvider>
    </BrowserRouter>
  );
};

export default FeedWidgetRoot;