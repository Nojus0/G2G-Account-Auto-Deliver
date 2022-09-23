import "dotenv/config"
import {IsDebug, SetDebug} from "./debug/Debug"
import {OrderType} from "./utils/Interfaces";
import {GetOrders} from "./logic/NewOrders";
import {ACCOUNT_MANAGER, DEFAULTS, SETTINGS, SETTINGS_MANAGER} from "./settings/SettingsManager";
import {AutoDeliver} from "./logic/AutoDeliver";

async function main() {

    const FILE_SETTINGS = SETTINGS_MANAGER.get()
    const ACCOUNTS = ACCOUNT_MANAGER.get()
    SetDebug(FILE_SETTINGS.IsDebug);

    if (IsDebug) console.log(`STARTED IN DEBUG MODE!`);

    if (FILE_SETTINGS.active_device_token == DEFAULTS.active_device_token ||
        FILE_SETTINGS.refresh_token == DEFAULTS.refresh_token
    ) {
        console.error("active_device_token or refresh_token cookie not set up in Settings.json.")
        return;
    }
    console.log("Getting OrderType.Completed Orders...")
    console.log(await GetOrders(OrderType.Completed));

    console.log("AutoDeliver Started.")

    if(ACCOUNTS.length < 1) {
        console.log(`[INFO] No accounts found in Accounts.json file!`)
    }

    const AUTO = new AutoDeliver(1000 * 60)
    AUTO.Run();
}

main();