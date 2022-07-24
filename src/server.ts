import "dotenv/config"
import { IsDebug, SetDebug } from "./debug/Debug"
import { OrderType } from "./utils/Interfaces";
import { GetOrders } from "./logic/NewOrders";
import { DEFAULTS, SETTINGS } from "./settings/SettingsManager";
import { AutoDeliver } from "./logic/AutoDeliver";

async function main() {
    SetDebug(SETTINGS.IsDebug);
    if (IsDebug) console.log(`STARTED IN DEBUG MODE!`); else console.log(`STARTED!`);

    if(SETTINGS.G2GSESID_V4 == DEFAULTS.G2GSESID_V4) {
        console.error("G2GSESID_V4 cookie not set up in Settings.json, delete to generate a new config file.")
        return;
    }

    console.log(await GetOrders(OrderType.Completed));
    const AUTO = new AutoDeliver(1000 * 60)
    AUTO.Run();
}

main();