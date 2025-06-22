import { MMKV } from 'react-native-mmkv'

const Storage = new MMKV()

export const getItem = async (key: string): Promise<string | null> => {
  try {
    const value = Storage.getString(key)
    if (value) {
      return value
    }
  } catch (e) {}
  return null
}

export const setItem = async (
  key: string,
  value: string | null | undefined
): Promise<boolean> => {
  try {
    if (value) {
      Storage.set(key, value)
    } else {
      Storage.delete(key)
    }
    return true
  } catch (error) {}
  return false
}

export const removeItem = async (key: string) => {
  try {
    Storage.delete(key)
    return true
  } catch (e) {}
  return false
}
