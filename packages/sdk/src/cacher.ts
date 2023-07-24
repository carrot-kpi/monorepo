interface CacheItem<T extends object | string> {
    validUntil: number;
    data: T;
}

export class Cacher {
    public readonly NAMESPACE: string;

    constructor(namespace: string) {
        this.NAMESPACE = namespace;
    }

    public get<T extends object | string>(key: string): T | null {
        const cache = localStorage.getItem(this.namespacedKey(key));
        if (!cache) return null;
        const cacheItem = JSON.parse(cache) as CacheItem<T>;
        if (cacheItem.validUntil < Date.now()) {
            this.clear(key);
            return null;
        }
        return cacheItem.data;
    }

    public getOrDefault<T extends object | string>(
        key: string,
        defaultValue: T,
    ): T {
        const cachedItem = this.get<T>(key);
        return cachedItem || defaultValue;
    }

    public set<T extends object | string>(
        key: string,
        value: T,
        validUntil: number,
    ) {
        localStorage.setItem(
            this.namespacedKey(key),
            JSON.stringify({ validUntil, data: value }),
        );
    }

    public clear(key: string) {
        localStorage.removeItem(this.namespacedKey(key));
    }

    protected namespacedKey(key: string): string {
        return `${this.NAMESPACE}-${key}`;
    }
}
