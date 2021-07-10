import axios, { AxiosError, AxiosRequestConfig } from "axios";

export async function SafeFetch(config: AxiosRequestConfig) {
    try {
        return await axios(config);
    } catch (err) {
        const ERROR: AxiosError = err;
        // console.log(ERROR.message)
        return ERROR.response;
    }
}
