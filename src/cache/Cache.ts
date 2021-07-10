import { CookieCache } from "../lib/Cache";
import { ISettings } from "../settings/SettingsManager";

export const CACHE = CookieCache.Create();

export function getCookieStringFromSettings(settings: ISettings): string {
    return `ogm[uc]=${settings["ogm[uc]"]};ogm[un]=${settings["ogm[un]"]};`
}

// export function getG2GTokenCache(): string {
//     return `G2GSESID_V4=${CACHE.get("www.g2g.com")?.get("G2GSESID_V4")}`
// }