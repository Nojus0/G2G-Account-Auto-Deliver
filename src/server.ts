import "dotenv/config"
import { IsDebug, SetDebug } from "./debug/Debug"
import { OrderType } from "./utils/Interfaces";
import { GetOrders } from "./logic/NewOrders";
import { SETTINGS } from "./settings/SettingsManager";
import { AutoDeliver } from "./logic/AutoDeliver";

async function main() {
    SetDebug(SETTINGS.IsDebug);
    if (IsDebug) console.log(`STARTED IN DEBUG MODE!`); else console.log(`STARTED!`);

    console.log(await GetOrders(OrderType.Completed));
    const AUTO = new AutoDeliver(1000 * 60)
    AUTO.Run();
}

main();