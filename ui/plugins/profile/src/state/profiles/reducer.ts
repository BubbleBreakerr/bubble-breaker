import { Reducer, useReducer } from 'react';
import { createContainer } from 'react-tracked';
import { handleActions } from '../handle-actions';
import { IAction, UseValueType } from '../interfaces';
import { actionTypes } from './action-types';
import { getProfilesActions } from './actions';
import {
  IChangeAppsFilter,
  IChangeProfilesFilter,
  IGetAppsPayload,
  IGetMoreAppsPayload,
  IGetMoreProfilesPayload,
  IGetProfilesPayload,
  IProfileState,
} from './interfaces';

export const profileState: IProfileState = {
  profiles: [],
  apps: [],
};

export function profileInit(initialValues?: Partial<IProfileState>): IProfileState {
  return {
    ...profileState,
    ...initialValues,
  };
}

type ProfileReducer = Reducer<IProfileState, IAction<any, keyof typeof actionTypes>>;

export const profileReducer: ProfileReducer = handleActions<typeof actionTypes, IProfileState, any>(
  {
    GET_PROFILES: (draft, payload: IGetProfilesPayload) => {
      draft.profiles = payload.profiles;
      return draft;
    },
    GET_MORE_PROFILES: (draft, payload: IGetMoreProfilesPayload) => {
      draft.profiles = draft.profiles.concat(payload.profiles);
      return draft;
    },
    GET_APPS: (draft, payload: IGetAppsPayload) => {
      draft.apps = payload.apps;
      return draft;
    },
    GET_MORE_APPS: (draft, payload: IGetMoreAppsPayload) => {
      draft.apps = draft.apps.concat(payload.apps);
      return draft;
    },
    CHANGE_PROFILES_FILTER: (draft, payload: IChangeProfilesFilter) => {
      draft.activeProfilesFilter = payload.filter;
      return draft;
    },
    CHANGE_APPS_FILTER: (draft, payload: IChangeAppsFilter) => {
      draft.activeAppsFilter = payload.filter;
      return draft;
    },
    // test same action in different reducers..
    CLEANUP: () => profileState,
  },
  profileState,
);

const useValue: UseValueType<any, IProfileState, typeof actionTypes, any> = ({
  reducer,
  initialState,
  init,
}: {
  reducer: Reducer<IProfileState, IAction<any, keyof typeof actionTypes>>;
  initialState: IProfileState;
  init: (initial: Partial<IProfileState>) => IProfileState;
}) => {
  const [state, dispatch] = useReducer(reducer, initialState, init);
  const actions = getProfilesActions(dispatch);
  return [state, actions];
};

export const {
  Provider: ProfileProvider,
  useTracked: useProfile,
  useTrackedState: useProfileState,
  useUpdate: useProfileUpdate,
  useSelector: useProfileSelector,
} = createContainer(useValue);