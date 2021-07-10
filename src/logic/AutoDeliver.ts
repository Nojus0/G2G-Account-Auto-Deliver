import { GetOrders } from "./NewOrders";
import path from "path"
import { Config } from "../settings/Config";
import { DeliverOrder } from "./DeliverOrder";
import { IsDebug } from "../debug/Debug";
import { IAccountJson, INewOrder, OrderType } from "../utils/Interfaces";
import { ISettings } from "../settings/SettingsManager";

export class AutoDeliver {
    private interval: number
    private accountsPath: string
    private IsRunning: boolean
    private AccountsManager: Config<IAccountJson[]>;
    constructor(settings: ISettings, Interval: number) {
        this.interval = Interval
        this.IsRunning = false;
        this.accountsPath = path.join(__dirname, "accounts.json")
        this.AccountsManager = new Config<IAccountJson[]>(this.accountsPath, []);
    }

    getSpecifiedDelivery(order_title: string) {
        let ACCOUNTS: IAccountJson[] = this.AccountsManager.get();

        for (const account of ACCOUNTS)
            if (account.target_title == order_title) {
                ACCOUNTS = ACCOUNTS.filter(item => item != account);

                if (IsDebug) return account;

                this.AccountsManager.set(ACCOUNTS);
                return account;
            }

        return null;
    }

    Stop() {
        this.IsRunning = false;
    }

    Run() {
        this.IsRunning = true;
        this.RunMethod();
    }

    private async RunMethod() {
        if (!this.IsRunning) return;

        const NEW_ORDERS: INewOrder[] = await GetOrders(OrderType.NewOrders);

        for (const ORDER of NEW_ORDERS) {
            const DELIVERY = this.getSpecifiedDelivery(ORDER.ItemTitle); if (DELIVERY == null) { console.log(`Order recieved but no account was found for specified order title (target_title)`); break; }

            await DeliverOrder(DELIVERY, ORDER.OID);

            console.log(`Delivered account: ${DELIVERY.account_id}`)
        }

        setTimeout(() => this.RunMethod(), this.interval);
    }
}

