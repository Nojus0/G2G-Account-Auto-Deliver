import { AxiosRequestConfig } from "axios";
import { CookieCache, IHostCache } from "redirect-cookies"
import { SETTINGS } from "../settings/SettingsManager";


export const overwriteShasso = () => (req_cfg: AxiosRequestConfig, host_cache: IHostCache) => {

    const WEBSITE = new URL(req_cfg.url!);

    if (WEBSITE.host == "www.shasso.com") {
        req_cfg.headers = {
            cookie: CookieCache.HostCacheToString(host_cache, new Map([
                ["ogm[un]", SETTINGS["ogm[un]"],],
                ["ogm[uc]", SETTINGS["ogm[uc]"]]
            ]))
        }
    } else
        req_cfg.headers = { cookie: CookieCache.HostCacheToString(host_cache) }

}