import axios, { AxiosError, AxiosRequestConfig } from "axios";

export async function SafeFetch(config: AxiosRequestConfig) {
    try {
        return await axios(config);
    } catch (err) {
        const ERROR = err as AxiosError
        // console.log(ERROR.message)
        return ERROR.response;
    }
}
