import {Config} from "./Config";
import path from "path"
import {IAccountJson} from "../utils/Interfaces";

const SETTINGS_PATH = path.resolve("Settings.json")

export const ACCOUNT_MANAGER = new Config<IAccountJson[]>(path.resolve("Accounts.json"), []);

export const DEFAULTS = {
    G2GSESID_V4: "random_text",
    refresh_token: "hex string with dot",
    active_device_token: "hex string"
}

export const SETTINGS_MANAGER = new Config<ISettings>(SETTINGS_PATH, {
    IsDebug: false,
    G2GSESID_V4: DEFAULTS.G2GSESID_V4,
    refresh_token: DEFAULTS.refresh_token,
    active_device_token: DEFAULTS.active_device_token
});


export const SETTINGS = {
    get cookie(): string {
        const LOADED_SETTINGS = SETTINGS_MANAGER.get()
        return `G2GSESID_V4=${LOADED_SETTINGS.G2GSESID_V4 || "77777777777777777777777777"};active_device_token=${LOADED_SETTINGS.active_device_token};refresh_token=${LOADED_SETTINGS.refresh_token};`
    },
    setG2GSESID_V4(val: string) {
        const LOADED_SETTINGS = SETTINGS_MANAGER.get()
        SETTINGS_MANAGER.set({
            ...LOADED_SETTINGS,
            G2GSESID_V4: val,
        })
    }
}


export interface ISettings {
    IsDebug: boolean,
    G2GSESID_V4: string
    refresh_token: string
    active_device_token: string
}


