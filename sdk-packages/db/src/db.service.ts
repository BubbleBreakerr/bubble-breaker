import coreServices from '@akashaproject/sdk-core/lib/constants';
import { AkashaService } from '@akashaproject/sdk-core/lib/IAkashaModule';
import { registerServiceMethods, toNamedService } from '@akashaproject/sdk-core/lib/utils';
import RxDB from 'rxdb';
import { AKASHAdb } from './collection.types';
import initCollections from './collections';
import { DB_NAME, DB_PASSWORD, DB_SERVICE, moduleName } from './constants';
import connect from './db.methods/connect';

const service: AkashaService = invoke => {
  let akashaDB: AKASHAdb;
  const dbConnect = async (refresh: boolean = false) => {
    if (!refresh && RxDB.isRxDatabase(akashaDB)) {
      return akashaDB;
    }
    const { getSettings } = invoke(coreServices.SETTINGS_SERVICE);
    const dbSettings = getSettings(moduleName);
    if (!dbSettings.hasOwnProperty(DB_PASSWORD)) {
      throw new Error('Set a db password before using the service.');
    }
    const db = await connect(
      dbSettings[DB_NAME],
      dbSettings[DB_PASSWORD],
    );
    akashaDB = await initCollections(db);
    return akashaDB;
  };
  return registerServiceMethods({ getDB: dbConnect });
};

export default toNamedService(DB_SERVICE, service);