import { AxiosRequestConfig } from "axios";
import { load } from "cheerio";
import { GetOrdersDebugValid, IsDebug } from "../debug/Debug";
import { INewOrder, OrderType } from "../utils/Interfaces";
import { CACHE } from "../cache/Cache";
import { overwriteShasso } from "../cache/redirectHandlers";
import { CookieCache } from "../lib/Cache";
import { fetchUrlRedirectCallback } from "../lib/callback";

export async function GetOrders(type: OrderType, page: number = 0): Promise<INewOrder[]> {
    if (IsDebug) return GetOrdersDebugValid();

    const config: AxiosRequestConfig = {
        method: 'get',
        url: `https://www.g2g.com/order/sellOrder?status=${type}&page=${page}`,
        headers: {
            'authority': 'www.g2g.com',
            'cache-control': 'max-age=0',
            'sec-ch-ua': '"Google Chrome";v="89", "Chromium";v="89", ";Not A Brand";v="99"',
            'sec-ch-ua-mobile': '?0',
            'upgrade-insecure-requests': '1',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.90 Safari/537.36',
            'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
            'sec-fetch-site': 'same-origin',
            'sec-fetch-mode': 'navigate',
            'sec-fetch-user': '?1',
            'sec-fetch-dest': 'document',
            'referer': 'https://www.g2g.com/order/sellOrder?status=5',
            'accept-language': 'en-US;q=0.9,en;q=0.8,lt;q=0.7',
            'cookie': CookieCache.HostCacheToString(CACHE.get("www.g2g.com")!)
        }
    };

    try {
        const RESPONSE = await fetchUrlRedirectCallback(config, CACHE, overwriteShasso);

        return ParseSoldOrdersHtml(load(RESPONSE.data), type);
    } catch (err) { console.log(`Server responded with an error when getting new orders, ${err.message}`); return []; }
}

function ParseSoldOrdersHtml(root: cheerio.Root, Type: OrderType): INewOrder[] { // Please replace with an JSON Api Call if one it exists.
    let NewOrders: INewOrder[] = [];
    const TABLE = root("table.sales-history__table > tbody");
    root("tr", TABLE).each(function (i, item) {
        const ItemName = root(".sales-history__product-name", item).text();
        const Price = root(".sales-history__table-price", item).text();
        const OrderId: number = Number(root(".sales-history__product-id", item)?.attr("href")?.match(/(?<=oid=)\d+/));

        if (isNaN(OrderId)) return NewOrders;

        let type = Type;

        if (Type === OrderType.All) {
            const order_type = parseInt(root("span.status", item).attr().class.split(" ")[1].replace(/\D/g, ''));
            type = order_type;
        }

        if (OrderId != null && ItemName != "" && Price != "") {
            NewOrders = [...NewOrders, {
                ItemPrice: Price,
                ItemTitle: ItemName,
                OID: OrderId,
                Type: type
            }]
        }

    });
    return NewOrders;
}

