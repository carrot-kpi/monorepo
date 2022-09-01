const PERSISTENCE_NAMESPACE = 'carrot-v1-sdk'

interface CacheItem<T extends object> {
  validUntil: number
  data: T
}

export abstract class Cacher {
  private constructor() {}

  public static get<T extends object>(key: string): T | null {
    const namespacedKey = `${PERSISTENCE_NAMESPACE}-${key}`
    const cache = localStorage.getItem(namespacedKey)
    if (!cache) {
      // console.debug(`cache miss for ${namespacedKey}`)
      return null
    }
    const cacheItem = JSON.parse(cache) as CacheItem<T>
    if (cacheItem.validUntil < Date.now()) {
      // console.debug(`expired cache for ${namespacedKey}`)
      Cacher.clear(namespacedKey)
      return null
    }
    // console.debug(`cache hit for ${namespacedKey}`)
    return cacheItem.data
  }

  public static getOrDefault<T extends object>(key: string, defaultValue: T): T {
    const cachedItem = Cacher.get<T>(key)
    return cachedItem || defaultValue
  }

  public static set<T extends object>(key: string, value: T, validUntil: number) {
    const namespacedKey = `${PERSISTENCE_NAMESPACE}-${key}`
    const serializedValue = JSON.stringify({ validUntil, data: value })
    // console.debug(`cached ${namespacedKey}: ${serializedValue}`)
    localStorage.setItem(namespacedKey, serializedValue)
  }

  public static clear(key: string) {
    const namespacedKey = `${PERSISTENCE_NAMESPACE}-${key}`
    // console.debug(`deleted from cache ${namespacedKey}`)
    localStorage.removeItem(namespacedKey)
  }
}
