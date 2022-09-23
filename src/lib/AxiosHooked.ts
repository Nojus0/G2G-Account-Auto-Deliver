import axios, {AxiosRequestConfig, AxiosResponse} from "axios";
import tough from "tough-cookie"
import {SETTINGS} from "../settings/SettingsManager"
import {SafeFetch} from "./utils";

export async function AxiosHooked(cfg: AxiosRequestConfig, redirectedTimes = 0): Promise<AxiosResponse<any>> {
    console.log(`Sending request to ${cfg.url}`)

    if (redirectedTimes > 5) {
        console.error(`[ERROR] redirected too many times(5), this should not happen and might be a bug.`)
        process.exit(1)
    }

    const resp = await SafeFetch(cfg);
    const urlParsed = new URL(cfg.url)
    const setCookieHeaders: string[] = resp.headers["set-cookie"] || []


    if (urlParsed.pathname == "/sso/login") {
        console.error(`[ERROR] refresh_token and active_device_token are most likely expired or invalid.`)
        process.exit(1)
    }

    const G2GCookie = setCookieHeaders.find((hdr) => {
        const parsedCookie = tough.parse(hdr)
        return parsedCookie.key == "G2GSESID_V4"
    })


    if (resp.status == 302 && G2GCookie && urlParsed.host == "www.g2g.com") {
        const parsedCookie = tough.parse(G2GCookie)

        console.log(`Got new G2GSESID=${parsedCookie.value}`)
        SETTINGS.setG2GSESID_V4(parsedCookie.value)
    }

    if (resp.status == 302 && resp.headers["location"]) {
        return AxiosHooked({
            url: resp.headers["location"],
            maxRedirects: 0,
            headers: {
                "cookie": SETTINGS.cookie
            }
        }, ++redirectedTimes)
    }

    return resp
}