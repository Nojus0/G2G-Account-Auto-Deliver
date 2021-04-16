import { Config } from "./Config";
import path from "path"

const SETTINGS_PATH = path.resolve("Settings.json")
const SETTINGS_MANAGER = new Config<ISettings>(SETTINGS_PATH, {
    G2GSESID_V4: "MY SESSION ID",
    IsDebug: false
});
export const L_SETTINGS = GetSettings();

export interface ISettings {
    IsDebug: boolean,
    G2GSESID_V4: string
}

export function GetSettings() {
    let settings = SETTINGS_MANAGER.get();
    settings.G2GSESID_V4 = `G2GSESID_V4=${settings.G2GSESID_V4}`;
    return settings;
}

export function SetSettings(newSettings: ISettings) {
    SETTINGS_MANAGER.set(newSettings);
}