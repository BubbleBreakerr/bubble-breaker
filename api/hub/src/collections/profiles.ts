import { Client, ThreadID } from '@textile/hub';
import { Profile } from './interfaces';

const schema = {
  title: 'Profile',
  type: 'object',
  required: ['_id', 'pubKey', 'ethAddress', 'creationDate'],
  properties: {
    _id: { type: 'string' },
    ethAddress: { type: 'string' },
    pubKey: { type: 'string' },
    userName: { type: 'string' },
    default: {
      type: 'array',
      uniqueItems: true,
      items: {
        type: 'object',
        required: ['provider', 'property', 'value'],
        properties: {
          provider: { type: 'string' },
          property: { type: 'string' },
          value: { type: 'string' },
        },
      },
    },
    creationDate: { type: 'number' },
    following: {
      type: 'array',
      items: {
        type: 'string',
      },
    },
    followers: {
      type: 'array',
      items: {
        type: 'string',
      },
    },
    providers: {
      type: 'array',
      uniqueItems: true,
      items: {
        type: 'object',
        required: ['provider', 'property', 'value'],
        properties: {
          provider: { type: 'string' },
          property: { type: 'string' },
          value: { type: 'string' },
        },
      },
    },
    // for extensibility
    metaData: {
      type: 'array',
      uniqueItems: true,
      items: {
        type: 'object',
        required: ['provider', 'property', 'value'],
        properties: {
          provider: { type: 'string' },
          property: { type: 'string' },
          value: { type: 'string' },
        },
      },
    },
  },
};

const writeValidator = (writer: string, event: any, instance: Profile) => {
  if (event.patch.type === 'delete') {
    if (writer === instance.pubKey) {
      return true;
    }
  }
  return writer === 'bbaareihqdqd3me37e3pfs6pmy72cam7viai4lbcpxlqt365wicrnsi6q7e';
};

const readFilter = (reader: string, instance: Profile) => {
  // can add extra filters here
  return instance;
};

const indexes = [
  {
    path: 'userName',
    unique: true,
  },
  {
    path: 'pubKey',
    unique: true,
  },
  {
    path: 'ethAddress',
    unique: true,
  },
  {
    path: 'creationDate',
    unique: false,
  },
];
export async function newCollection(client: Client, threadID: ThreadID) {
  return await client.newCollection(threadID, {
    schema,
    writeValidator,
    readFilter,
    indexes,
    name: 'Profiles',
  });
}

export async function updateCollection(client: Client, threadID: ThreadID) {
  return await client.updateCollection(threadID, {
    schema,
    writeValidator,
    readFilter,
    indexes,
    name: 'Profiles',
  });
}