import { INewOrder, OrderType } from "./Interfaces";

export let IsDebug = false;

export function SetDebug(val: boolean) {
    IsDebug = val;
}

export function GetOrdersDebugValid() {
    const val: INewOrder[] = [
        {
            ItemPrice: "100$",
            ItemTitle: "GTA V PREMIUM ACCOUNT [FULL MAIL ACCESS]",
            OID: 100,
            Type: OrderType.NewOrders
        }
    ]
    return val
}