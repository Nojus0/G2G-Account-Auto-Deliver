import { Config } from "./Config";
import path from "path"
import { IAccountJson } from "../utils/Interfaces";

const SETTINGS_PATH = path.resolve("Settings.json")

export const ACCOUNT_MANAGER = new Config<IAccountJson[]>(path.resolve("Accounts.json"), []);

export const SETTINGS_MANAGER = new Config<ISettings>(SETTINGS_PATH, {
    IsDebug: false,
    "ogm[uc]": "random string of letters has a dot somewhere expires in 3 months",
    "ogm[un]": "url encoded email"
});

export const SETTINGS = SETTINGS_MANAGER.get();

export interface ISettings {
    IsDebug: boolean,
    "ogm[un]": string,
    "ogm[uc]": string
}

