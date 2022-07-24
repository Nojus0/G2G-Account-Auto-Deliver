import { Config } from "./Config";
import path from "path"
import { IAccountJson } from "../utils/Interfaces";

const SETTINGS_PATH = path.resolve("Settings.json")

export const ACCOUNT_MANAGER = new Config<IAccountJson[]>(path.resolve("Accounts.json"), []);

export const DEFAULTS = {
    G2GSESID_V4: "g2g session cookie"
}

export const SETTINGS_MANAGER = new Config<ISettings>(SETTINGS_PATH, {
    IsDebug: false,
    "G2GSESID_V4": DEFAULTS.G2GSESID_V4
});

const SettingsTemp = SETTINGS_MANAGER.get()

export const SETTINGS = {
    ...SettingsTemp,
    get cookie(): string {
        const cookie = `G2GSESID_V4=${SettingsTemp.G2GSESID_V4};`
        return cookie
    }
}


export interface ISettings {
    IsDebug: boolean,
    "G2GSESID_V4": string
}


