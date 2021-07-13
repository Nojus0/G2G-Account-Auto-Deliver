import { GetOrders } from "./NewOrders";
import { DeliverOrder } from "./DeliverOrder";
import { IsDebug } from "../debug/Debug";
import { IAccountJson, INewOrder, OrderType } from "../utils/Interfaces";
import { ACCOUNT_MANAGER } from "../settings/SettingsManager";
import notifier from "node-notifier";

export class AutoDeliver {
    private interval: number
    private IsRunning: boolean
    constructor(Interval: number) {
        this.interval = Interval
        this.IsRunning = false;
    }

    getSpecifiedDelivery(order_title: string) {
        let ACCOUNTS: IAccountJson[] = ACCOUNT_MANAGER.get();

        for (const account of ACCOUNTS)
            if (account.target_title == order_title) {
                ACCOUNTS = ACCOUNTS.filter(item => item != account);

                if (IsDebug) return account;

                ACCOUNT_MANAGER.set(ACCOUNTS);
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

        if (NEW_ORDERS.length < 1) console.log(`No new orders found.`)

        for (const ORDER of NEW_ORDERS) {
            const DELIVERY = this.getSpecifiedDelivery(ORDER.ItemTitle); if (DELIVERY == null) { console.log(`Order recieved but no account was found for specified order title (target_title)`); break; }

            if (await DeliverOrder(DELIVERY, ORDER.OID))
                this.notifyDelivered(ORDER.ItemTitle, DELIVERY.account_id);
            else
                this.notifyDelivered(ORDER.ItemTitle, DELIVERY.account_id, false);

        }

        setTimeout(async () => await this.RunMethod(), this.interval);
    }

    notifyDelivered(ItemTitle: string, account_id: string, success: boolean = true) {
        notifier.notify({ wait: true, title: success ? "Account delivered" : "Failled to deliver", message: `${ItemTitle}\n\r${account_id}` })
        console.log(success ? `Account delivered: ${account_id}` : `Failled to deliver: ${account_id}`);
    }
}

