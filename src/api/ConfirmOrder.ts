import axios, { AxiosRequestConfig } from "axios"
import qs from "querystring"
import { CACHE } from "../cache/Cache";
import { overwriteShasso } from "../cache/redirectHandlers";
import { fetchUrlRedirectCallback } from "../lib/callback";
import { IAccountDeliver } from "../utils/Interfaces";

export async function ConfirmOrder(data: IAccountDeliver) {
    const Data = qs.stringify({
        ...data,
        cbp: data.id - 40
    });
    const config: AxiosRequestConfig = {
        method: 'post',
        url: 'https://www.g2g.com/order/sellOrder/confirmDeliver',
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
            'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8,lt;q=0.7',
        },
        data: Data
    };

    try {
        await fetchUrlRedirectCallback(config, CACHE, overwriteShasso);
        console.log(`Successfuly completed for order ${data.id}`)
        return true;
    } catch (err) {
        console.log(`Server responded with error for order ${data.id}`);
        return false;
    }
}
