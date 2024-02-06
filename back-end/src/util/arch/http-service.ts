import { IHttpClient } from '../http/http-client'
import { createLogger, ILogger } from '../tools/logger'

export interface IHttpService { }

export interface IHttpServiceParams {
    url: string
    payload?: any
    headers?: Record<string, string>
}

export class HttpService implements IHttpService {
    constructor(
        private readonly httpClient: IHttpClient,
        private readonly filename: string
    ) {
        this.log = createLogger(filename)
    }

    protected async get(params: IHttpServiceParams): Promise<any> {
        return this.httpClient.get(params)
    }

    protected async post(params: IHttpServiceParams): Promise<any> {
        return this.httpClient.post(params)
    }

    protected async put(params: IHttpServiceParams): Promise<any> {
        return this.httpClient.put(params)
    }

    protected async delete(params: IHttpServiceParams): Promise<any> {
        return this.httpClient.delete(params)
    }

    protected log: ILogger
}
