import "dotenv/config"
import { IsDebug, SetDebug } from "./debug/Debug"
import { OrderType } from "./utils/Interfaces";
import { GetOrders } from "./logic/NewOrders";
import { SETTINGS } from "./settings/SettingsManager";
import { CACHE } from "./cache/Cache";

async function main() {
    SetDebug(SETTINGS.IsDebug);
    if (IsDebug) console.log(`STARTED IN DEBUG MODE!`); else console.log(`STARTED!`);

    console.log(await GetOrders(OrderType.Completed));
    console.log(CACHE)
}

main();