import axios, { AxiosRequestConfig } from "axios";
import { load } from "cheerio";
import { IRAWAccount, } from "../utils/Interfaces";
import { CACHE, } from "../cache/Cache";
import { fetchUrlRedirectCallback } from "../lib/callback";
import { overwriteShasso } from "../cache/redirectHandlers";

export async function GetDelivered(OID: number): Promise<IRAWAccount> {
    const config: AxiosRequestConfig = {
        method: 'get',
        url: `https://www.g2g.com/order/sellOrder/order?oid=${OID}`,
        headers: {
            'authority': 'www.g2g.com',
            'pragma': 'no-cache',
            'cache-control': 'no-cache',
            'sec-ch-ua': '"Google Chrome";v="89", "Chromium";v="89", ";Not A Brand";v="99"',
            'sec-ch-ua-mobile': '?0',
            'upgrade-insecure-requests': '1',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Safari/537.36',
            'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
            'sec-fetch-site': 'same-origin',
            'sec-fetch-mode': 'navigate',
            'sec-fetch-user': '?1',
            'sec-fetch-dest': 'document',
            'referer': 'https://www.g2g.com/order/sellOrder/index?status=0&page=4',
            'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8,lt;q=0.7',
        }
    };

    const response = await fetchUrlRedirectCallback(config, CACHE, overwriteShasso)
    return ParseDeliveredPage(load(response.data));
}


function ParseDeliveredPage(document: cheerio.Root): IRAWAccount {
    const val: IRAWAccount = {
        account_id: document("#account_id").val(),
        password: document("#password").val(),
        first_name: document("#first_name").val(),
        last_name: document("#last_name").val(),
        account_country: document("#account_country").val(),
        date_of_birth: document("#date_of_birth").val(),
        email_account: document("#email_account").val(),
        email_password: document("#email_password").val(),
        secret_question: document("#secret_question").val(),
        secret_answer: document("#secret_answer").val(),
        additional_note: document("#additional_note").val(),
    }
    return val;
}