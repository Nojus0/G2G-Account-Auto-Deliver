import { ConfirmOrder} from "./ConfirmOrder";
import { IsDebug } from "./Debug";
import { IAccountDeliver, IAccountJson } from "./Interfaces";
import { StartTradeOrderId } from "./StartTrade";
import { ViewOrderId } from "./ViewOrderId";

export async function DeliverOrder(accountDetails: IAccountJson, ORDER_ID: number, cookies: string) {
    if (IsDebug) return true;

    if (!await ViewOrderId(ORDER_ID, cookies)) return false;
    if (!await StartTradeOrderId(ORDER_ID, cookies)) return false;
    if (!await ConfirmOrder({
        ...accountDetails,
        id: ORDER_ID
    }, cookies)) return false;
    
    return true;
}