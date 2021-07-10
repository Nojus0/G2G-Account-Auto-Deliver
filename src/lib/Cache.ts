export class CookieCache {

    static Create() {
        return new Map<string, Map<string, string>>([]);
    }

    static HostCacheToString(specifiedHostCache: Map<string, string>, overwrite: Map<string, string> = new Map()): string {
        let strCookies = "";

        for (const key of overwrite.keys()) {
            specifiedHostCache.set(key, overwrite.get(key));
        }

        specifiedHostCache?.forEach((val, key) => strCookies += `${key}=${val};`)

        return strCookies;
    }


}