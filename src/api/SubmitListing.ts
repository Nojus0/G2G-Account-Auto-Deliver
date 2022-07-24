import axios, { AxiosRequestConfig } from "axios";
import qs from "querystring";
import { SETTINGS } from "../settings/SettingsManager";
import { SubmitListingResponse, ISubmitListingData } from "../utils/Interfaces";

export async function SubmitListing(listing: ISubmitListingData) {
  const {
    Currency,
    Delivery_Time_Offline_Hours,
    Delivery_Time_Online_Hours,
    Listing_Description,
    Listing_Duration_Days,
    Listing_Insurance_Days,
    Listing_Title,
    Price,
    country,
    game,
    platform,
    service,
    subgame,
    AgreeToTermsAndPolicies,
  } = listing;

  const data = qs.stringify({
    service: service,
    game: game,
    platform: platform,
    country: country,
    "C2cProductsListing[products_title]": Listing_Title,
    "C2cProductsListing[products_description]": Listing_Description,
    "sub-game": subgame === undefined && "",
    "C2cProductsListing[products_base_currency]": Currency,
    "C2cProductsListing[products_price]": Price,
    "C2cProductsListing[listing_insurance]": Listing_Insurance_Days,
    "C2cProductsListing[listing_duration]": Listing_Duration_Days,
    "C2cProductsListing[online_hr]": Delivery_Time_Online_Hours,
    "C2cProductsListing[offline_hr]": Delivery_Time_Offline_Hours,
    "agreement_option[]": AgreeToTermsAndPolicies,
  });
  const config: AxiosRequestConfig = {
    method: "post",
    url: "https://www.g2g.com/sell/submitListing",
    headers: {
      authority: "www.g2g.com",
      pragma: "no-cache",
      "cache-control": "no-cache",
      "sec-ch-ua":
        '"Chromium";v="88", "Google Chrome";v="88", ";Not A Brand";v="99"',
      accept: "application/json, text/javascript, */*; q=0.01",
      "x-requested-with": "XMLHttpRequest",
      "sec-ch-ua-mobile": "?0",
      "user-agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.190 Safari/537.36",
      "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
      origin: "https://www.g2g.com",
      "sec-fetch-site": "same-origin",
      "sec-fetch-mode": "cors",
      "sec-fetch-dest": "empty",
      referer: "https://www.g2g.com/sell/index",
      "accept-language": "en-GB,en-US;q=0.9,en;q=0.8,lt;q=0.7",
      cookie: SETTINGS.cookie,
    },
    data: data,
  };
  try {
    const response = await axios(config);
    return <SubmitListingResponse>response.data;
  } catch (err) {
    const fail: SubmitListingResponse = { status: false };
    return fail;
  }
}
