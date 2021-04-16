import { config } from "dotenv";
import { AutoDeliver } from "./AutoDeliver";
config();
import { IsDebug, SetDebug } from "./Debug"
import { OrderType } from "./Interfaces";
import { GetOrders } from "./NewOrders";
import { GetSettings } from "./SettingsManager"

async function main() {
    const SETTINGS = GetSettings();
    SetDebug(SETTINGS.IsDebug);
    console.log(await GetOrders(SETTINGS.G2GSESID_V4, OrderType.Completed));
    
    if (IsDebug) console.log(`STARTED IN DEBUG MODE!`); else console.log(`STARTED!`);
    const deliver = new AutoDeliver(SETTINGS.G2GSESID_V4, 60 * 1000);
    deliver.Run();
}

main();