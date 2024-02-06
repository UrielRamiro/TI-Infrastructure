import axios from 'axios'

export type HttpClientParams<M extends 'get' | 'post' | 'put' | 'delete'> = {
    url: string
    headers?: Record<string, string>
    payload?: M extends 'post' | 'put' ? any : never
}

export interface IHttpClient {
    get(params: HttpClientParams<'get'>): Promise<any>
    post(params: HttpClientParams<'post'>): Promise<any>
    put(params: HttpClientParams<'put'>): Promise<any>
    delete(params: HttpClientParams<'delete'>): Promise<any>
}

export const httpClient: IHttpClient = {
    async get({ url, headers }: HttpClientParams<'get'>): Promise<any> {
        return axios.get(url, { headers })
    },

    async post({
        url,
        headers,
        payload
    }: HttpClientParams<'post'>): Promise<any> {
        return axios.post(url, payload, { headers })
    },

    async put({ url, headers, payload }: HttpClientParams<'put'>): Promise<any> {
        return axios.put(url, payload, { headers })
    },

    async delete({ url, headers }: HttpClientParams<'delete'>): Promise<any> {
        return axios.delete(url, { headers })
    }
}
