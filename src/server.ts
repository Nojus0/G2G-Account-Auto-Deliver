import "dotenv/config"
import { IsDebug, SetDebug } from "./debug/Debug"
import { OrderType } from "./utils/Interfaces";
import { GetOrders } from "./logic/NewOrders";
import {DEFAULTS, SETTINGS, SETTINGS_MANAGER} from "./settings/SettingsManager";
import { AutoDeliver } from "./logic/AutoDeliver";

async function main() {

    const FILE_SETTINGS = SETTINGS_MANAGER.get()

    SetDebug(FILE_SETTINGS.IsDebug);

    if (IsDebug) console.log(`STARTED IN DEBUG MODE!`);

    if(FILE_SETTINGS.G2GSESID_V4 == DEFAULTS.G2GSESID_V4) {
        console.error("G2GSESID_V4 cookie not set up in Settings.json, delete to generate a new config file.")
        return;
    }
    console.log("Getting OrderType.Completed Orders...")
    console.log(await GetOrders(OrderType.Completed));

    console.log("AutoDeliver Started.")
    const AUTO = new AutoDeliver(1000 * 60)
    AUTO.Run();
}

main();