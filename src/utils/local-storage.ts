export type StorageType = 'localStorage' | 'sessionStorage'

export type SaveOnStorageParams<T> = {
  key: string
  data: T
  storageType?: StorageType
}

export function saveOnStorage<T> ({
  data,
  key,
  storageType = 'localStorage'
}: SaveOnStorageParams<T>) {
  let dataToSave: string

  if (typeof data === 'string') {
    dataToSave = data
  } else {
    dataToSave = JSON.stringify(data)
  }

  try {
    window[storageType].setItem(key, dataToSave)
  } catch {
    console.error(`error in save item on ${storageType}`, data)
  }
}

type RemoveOfStorageParams = {
  key: string
  storageType: StorageType
}

export function removeOfStorage ({ key, storageType }: RemoveOfStorageParams) {
  try {
    console.log(storageType, 'type')
    window[storageType].removeItem(key)
  } catch {
    console.error(`error in remove item on ${storageType}`, key)
  }
}

export function getOnStorage<T extends Record<string, unknown>>(
  key: string,
  storageType: StorageType,
  parser: boolean
): T | null
export function getOnStorage(
  key: string,
  storageType: StorageType
): string | null
export function getOnStorage<T> (
  key: string,
  storageType: StorageType,
  parser?: boolean
): T | string | null {
  try {
    const item = window[storageType].getItem(key)
    if (item) {
      if (parser) {
        return JSON.parse(item) as T
      }

      return item
    }

    return null
  } catch {
    return null
  }
}
