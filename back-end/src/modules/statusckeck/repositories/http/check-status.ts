import { ICheckStatus } from "../../api/definitions/repositories";
import { IHttpClient } from "../../../../util/http/http-client";
import { HttpService } from "../../../../util/arch/http-service";



export class CheckStatus extends HttpService implements ICheckStatus {
    constructor(httpClient: IHttpClient) {
        super(httpClient, __filename)
    }

    async execute() {
        try {
            const url = 'http://checkpoint02_frontend_1/health-check.js'
            const response = this.get({ url })
            this.log.debug('response axios', response)
            return true
        } catch (e) {
            console.log(e)
            return false
        }

    }

}