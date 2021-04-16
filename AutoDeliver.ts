import { GetOrders } from "./NewOrders";
import path from "path"
import { Config } from "./Config";
import { DeliverOrder } from "./DeliverOrder";
import { IsDebug } from "./Debug";
import { IAccountJson, INewOrder, OrderType } from "./Interfaces";

export class AutoDeliver {
    cookies: string
    private interval: number
    private accountsPath: string
    private IsRunning: boolean
    private AccountsManager: Config<IAccountJson[]>;
    constructor(Cookies: string, Interval: number) {
        this.interval = Interval
        this.cookies = Cookies;
        this.IsRunning = false;
        this.accountsPath = path.join(__dirname, "accounts.json")
        this.AccountsManager = new Config<IAccountJson[]>(this.accountsPath, [{
            account_id: "My Account",
            account_country: "Lithuania",
            additional_note: "....",
            date_of_birth: "0000-0000",
            email_account: "email@duckmail.com",
            email_password: "shitter",
            first_name: "John",
            last_name: "Deer",
            password: "Johndeer",
            secret_answer: "Who im i?",
            secret_question: "Me",
            target_title: "MY ACCOUNT RANK 40 #12"
        }]);
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

        const NEW_ORDERS: INewOrder[] = await GetOrders(this.cookies, OrderType.NewOrders);
        
        for (const ORDER of NEW_ORDERS) {
            const DELIVERY = this.getSpecifiedDelivery(ORDER.ItemTitle); if (DELIVERY == null) { console.log(`Order recieved but no account was found for specified order title (target_title)`); break; }

            await DeliverOrder(DELIVERY, ORDER.OID, this.cookies);

            console.log(`Delivered account: ${DELIVERY.account_id}`)
        }

        setTimeout(() => this.RunMethod(), this.interval);
    }
}

