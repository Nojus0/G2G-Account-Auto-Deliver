import { AxiosRequestConfig, AxiosResponse } from "axios";
import { ICache, IRedirectCallback, IRedirectEndCallback } from "./interfaces";
import { SafeFetch } from "./utils";
import tough from "tough-cookie";

export async function fetchUrlRedirectCallback(
    requestConfig: AxiosRequestConfig,
    COOKIE_CACHE: ICache,
    beforeFollowRedirect: IRedirectCallback,
    onFinished: IRedirectEndCallback = () => { },
): Promise<AxiosResponse> {

    ValidateWebsiteCache(COOKIE_CACHE, requestConfig.url);

    const WEBSITE = new URL(requestConfig.url);
    const CURRENT_HOST_CACHE = COOKIE_CACHE.get(WEBSITE.host);

    await beforeFollowRedirect(requestConfig, CURRENT_HOST_CACHE);

    requestConfig.maxRedirects = 0;
    const RESPONSE: AxiosResponse = await SafeFetch(requestConfig)


    // * example ["cookie=something", "another=1"] *
    const SET_COOKIES: string[] = RESPONSE.headers["set-cookie"] || [];

    for (const RAW_COOKIE of SET_COOKIES) {
        const COOKIE = tough.parse(RAW_COOKIE);

        CURRENT_HOST_CACHE.set(COOKIE.key, COOKIE.value);

        COOKIE_CACHE.set(WEBSITE.host, CURRENT_HOST_CACHE);
    }


    if (RESPONSE.status != 302) {
        await onFinished(RESPONSE, CURRENT_HOST_CACHE);
        return RESPONSE;
    }


    return await fetchUrlRedirectCallback({ url: RESPONSE.headers.location, maxRedirects: 0 }, COOKIE_CACHE, beforeFollowRedirect, onFinished);

}


export function ValidateWebsiteCache(
    COOKIE_CACHE: ICache, // * Passed by reference *
    url: string
) {

    const WEBSITE = new URL(url);

    if (!COOKIE_CACHE.has(WEBSITE.host))
        COOKIE_CACHE.set(WEBSITE.host, new Map<string, string>([]));

}