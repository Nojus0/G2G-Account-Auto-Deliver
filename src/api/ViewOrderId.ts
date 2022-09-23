import axios, { AxiosRequestConfig } from "axios"
import qs from "querystring"
import { SETTINGS } from "../settings/SettingsManager";
import { IViewOrderIDResponse } from "../utils/Interfaces";
import {AxiosHooked} from "../lib/AxiosHooked";
export async function ViewOrderId(orderid: number) {
    
    const data = qs.stringify({
        sell_order_id: orderid
    });

    const config: AxiosRequestConfig = {
        method: 'post',
        url: 'https://www.g2g.com/order/sellOrder/view',
        headers: {
            'authority': 'www.g2g.com',
            'sec-ch-ua': '"Google Chrome";v="89", "Chromium";v="89", ";Not A Brand";v="99"',
            'accept': 'application/json, text/javascript, */*; q=0.01',
            'x-requested-with': 'XMLHttpRequest',
            'sec-ch-ua-mobile': '?0',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.90 Safari/537.36',
            'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'origin': 'https://www.g2g.com',
            'sec-fetch-site': 'same-origin',
            'sec-fetch-mode': 'cors',
            'sec-fetch-dest': 'empty',
            'referer': `https://www.g2g.com/order/sellOrder/order?oid=${orderid}`,
            'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8,lt;q=0.7',
            cookie: SETTINGS.cookie
        },
        data: data
    };

    try {
        const response = await AxiosHooked(config)

        const model = <IViewOrderIDResponse>response.data;
        if (model.status) { console.log(`Successfully Viewed Order ${orderid} Details`); return true; }
        else { console.log(`Failed Viewing order ${orderid}. Response: ${JSON.stringify(response.data)}`); return false };
    } catch (err) {
        console.log(`Server responded with an error, for view order id ${orderid}`);
        return false;
    }

}
