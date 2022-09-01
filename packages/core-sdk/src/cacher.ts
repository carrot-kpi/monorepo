const PERSISTENCE_NAMESPACE = 'carrot-sdk'

interface CacheItem<T extends object> {
  validUntil: number
  data: T
}

export abstract class Cacher {
  private constructor() {}

  public static get<T extends object>(key: string): T | null {
    const cache = localStorage.getItem(`${PERSISTENCE_NAMESPACE}-${key}`)
    if (!cache) return null
    const cacheItem = JSON.parse(cache) as CacheItem<T>
    if (cacheItem.validUntil < Date.now()) {
      Cacher.clear(`${PERSISTENCE_NAMESPACE}-${key}`)
      return null
    }
    return cacheItem.data
  }

  public static getOrDefault<T extends object>(key: string, defaultValue: T): T {
    const cachedItem = Cacher.get<T>(key)
    return cachedItem || defaultValue
  }

  public static set<T extends object>(key: string, value: T, validUntil: number) {
    localStorage.setItem(`${PERSISTENCE_NAMESPACE}-${key}`, JSON.stringify({ validUntil, data: value }))
  }

  public static clear(key: string) {
    localStorage.removeItem(`${PERSISTENCE_NAMESPACE}-${key}`)
  }
}
