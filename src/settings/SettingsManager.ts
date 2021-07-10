import { Config } from "./Config";
import path from "path"

const SETTINGS_PATH = path.resolve("Settings.json")

export const SETTINGS_MANAGER = new Config<ISettings>(SETTINGS_PATH, {
    IsDebug: false,
    "ogm[uc]": "random string of letters has a dot somewhere",
    "ogm[un]": "url encoded email"
});

export const SETTINGS = SETTINGS_MANAGER.get();

export interface ISettings {
    IsDebug: boolean,
    "ogm[un]": string,
    "ogm[uc]": string
}