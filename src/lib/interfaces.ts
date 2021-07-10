import { AxiosRequestConfig, AxiosResponse } from "axios";

export interface IRedirectCallback {
    (beforeRedirect: AxiosRequestConfig, currentHostCache: Map<string, string>): void | Promise<void>
}

export interface IRedirectEndCallback {
    (onFinished: AxiosResponse, currentHostCache: Map<string, string>): void | Promise<void>
}

export interface IRedirect {
    beforeSend(beforeRedirect: AxiosRequestConfig, currentHostCache: Map<string, string>): void | Promise<void>
    onFinished(onFinished: AxiosResponse, currentHostCache: Map<string, string>): void | Promise<void>

}

export type ICache = Map<string, Map<string, string>>;

export type IHostCache = Map<string, string>