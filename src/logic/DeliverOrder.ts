import { ConfirmOrder } from "../api/ConfirmOrder";
import { IsDebug } from "../debug/Debug";
import { IAccountDeliver, IAccountJson } from "../utils/Interfaces";
import { StartTradeOrderId } from "../api/StartTrade";
import { ViewOrderId } from "../api/ViewOrderId";
import { ISettings } from "../settings/SettingsManager";

export async function DeliverOrder(accountDetails: IAccountJson, ORDER_ID: number, settings: ISettings) {
    if (IsDebug) return true;

    if (!await ViewOrderId(ORDER_ID)) return false;
    if (!await StartTradeOrderId(ORDER_ID)) return false;
    if (!await ConfirmOrder({
        ...accountDetails,
        id: ORDER_ID
    })) return false;

    return true;
}