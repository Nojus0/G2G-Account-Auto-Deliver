import { AxiosRequestConfig, AxiosResponse } from "axios";

export interface IRedirect {

    /**
     *  Called before sending a request this includes
     *  following a redirect and the initial AxiosConfig
     *  provided to the first parameter of fetchUrlRedirectCallback function
     * @param requestConfig The request config to modify before sending a request
     * @param currentHostCache Current Set-Cookie Cache for that host.
     */
    beforeSend(requestConfig: AxiosRequestConfig, currentHostCache: Map<string, string>): void | Promise<void>

    /**
     * Called when final response - http status code 200 is recieved.
     * @param FinalResponse Final AxiosResponse
     * @param currentHostCache Current Set-Cookie Cache for that host.
     */
    onFinished(FinalResponse: AxiosResponse, currentHostCache: Map<string, string>): void | Promise<void>

}

export type ICache = Map<string, Map<string, string>>;

export type IHostCache = Map<string, string>