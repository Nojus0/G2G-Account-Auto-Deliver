import { AxiosRequestConfig } from "axios";
import { CookieCache } from "../lib/Cache";
import { IHostCache } from "../lib/interfaces";
import { SETTINGS } from "../settings/SettingsManager";


export function overwriteShasso(req_cfg: AxiosRequestConfig, host_cache: IHostCache) {

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