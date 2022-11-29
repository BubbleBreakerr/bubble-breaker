export interface IDraftStorage {
  setItem(key: string, value: string): void;
  getItem(key: string): string;
  removeItem(key: string): void;
}

interface IDraftFields {
  storage: IDraftStorage;
  appName: string;
  pubKey: string;
  action: 'post' | 'repost';
}

interface IDraft<T> extends IDraftFields {
  save(content: T): void;
  get(): void;
  clear(): void;
}

export class Draft<T> implements IDraft<T> {
  storage: IDraftStorage;
  appName: string;
  pubKey: string;
  action: 'post' | 'repost';

  constructor({ storage, appName, pubKey, action }: IDraftFields) {
    this.storage = storage;
    this.appName = appName;
    this.pubKey = pubKey;
    this.action = action;
  }

  static getDraftKey(appName: string, pubKey: string, action: string) {
    return `${appName}-${pubKey}-draft-${action}`;
  }

  save(content: T) {
    this.storage.setItem(
      Draft.getDraftKey(this.appName, this.pubKey, this.action),
      JSON.stringify(content),
    );
  }

  get() {
    try {
      return JSON.parse(
        this.storage.getItem(Draft.getDraftKey(this.appName, this.pubKey, this.action)),
      ) as T;
    } catch {
      return null;
    }
  }

  clear() {
    this.storage.removeItem(Draft.getDraftKey(this.appName, this.pubKey, this.action));
  }
}