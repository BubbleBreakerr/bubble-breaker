import { RxCollection, RxDocument } from 'rxdb';

export interface SettingsDocType {
  ethAddress: string;
  moduleName: string;
  services: Array<[string, any]>;
}

export interface SettingsDocMethods {
  getSettingsObject(): object;
}

export type SettingsDoc = RxDocument<SettingsDocType, SettingsDocMethods>;

export interface SettingsCollectionMethods {
  getAllSettings(ethAddress: string): Promise<SettingsDoc[]>;
}

export type SettingsCollection = RxCollection<
  SettingsDocType,
  SettingsDocMethods,
  SettingsCollectionMethods
>;