import { AxiosRequestConfig, AxiosResponse } from "axios";
import { CookieCache } from "../lib/Cache";
import { IHostCache, IRedirect } from "../lib/interfaces";
import { SETTINGS } from "../settings/SettingsManager";

export const overwriteShasso: IRedirect = {
    beforeSend, onFinished
}

function beforeSend(req_cfg: AxiosRequestConfig, host_cache: IHostCache) {

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

function onFinished(resp: AxiosResponse, host_cache: Map<string, string>) {
    if (new URL(resp.config.url).host == "www.shasso.com") {
        console.log(`
        You were redirected to shasso login page.
        There is an issue with your settings, your
        shasso cookie probably expired or is invalid.
        `)
    }
}