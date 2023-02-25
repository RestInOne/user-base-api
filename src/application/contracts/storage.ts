export interface IStorage {
  set: (key: StorageKeys, value: any) => void
  get: (key: StorageKeys) => any
}

export enum StorageKeys {
  TOKEN = 'token'
}
