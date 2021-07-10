export interface IAccountDeliver extends IRAWAccount {
    id: number,
}

export interface IAccountJson extends IRAWAccount {
    target_title: string
}

export interface IRAWAccount {
    account_id: string,
    password: string,
    first_name: string,
    last_name: string,
    account_country: string,
    date_of_birth: string,
    email_account: string,
    email_password: string,
    secret_question: string,
    secret_answer: string,
    additional_note: string
}

export interface INewOrder {
    ItemTitle: string
    ItemPrice: string
    Type: OrderType
    OID: number,
}

export interface IViewOrderIDResponse {
    status: boolean;
    message: string;
}
export enum OrderType {
    NewOrders = 5,
    Preparing = 6,
    Delivering = 1,
    CancelRequested = 7,
    Delivered = 2,
    Completed = 3,
    Cancelled = 4,
    Issues = 8,
    All = 0,
}

export enum Services {
    Account = 5,
    GameCoins = 1,
    Items = 16,
    Boosting = 18,
    Coaching = 17,
    Skins = 20,
}

export enum Country {
    UK = 33594
}

export interface SubmitListingResponse {
    status: boolean;
}

export interface ISubmitListingData {
    /**
     * Listing service, accounts are the only thing that is supported, other services may not work.
     */
    service: Services,
    /**
     * Game Id, see how to find it https://i.imgur.com/hmHkzUJ.png
     */
    game: number,

    /**
     * See how to find platform id: https://i.imgur.com/hmHkzUJ.png
     */
    platform: number,

    /**
     * See how to find "Country" aka Account Edition/Type https://i.imgur.com/hmHkzUJ.png
     */
    country: Country | number,
    /**
     * Listing Title
     */
    Listing_Title: string,
    /**
     * Listing Description, new lines are accepted.
     */
    Listing_Description: string,
    /**
     * Not required.
     */
    subgame?: string,
    /**
     * Currency of choice. Can be other, example "AUD"
     */
    Currency: string | "GBP" | "USD" | "EUR",
    /**
     * Price in the provided currency.
     */
    Price: number,
    /**
     * Listing insurance in days.
     */
    Listing_Insurance_Days: number | 14 | 30 | 90,
    /**
     * Listing duration
     */
    Listing_Duration_Days: number | 7 | 14 | 30,
    /**
     * Delivery ETA when you are Online
     */
    Delivery_Time_Online_Hours: number,
    /**
    * Delivery ETA when you are Offline
    */
    Delivery_Time_Offline_Hours: number,
    /**
     * Agree to G2G Terms and Conditions and Policies
     */
    AgreeToTermsAndPolicies: "yes" | "no"
}
