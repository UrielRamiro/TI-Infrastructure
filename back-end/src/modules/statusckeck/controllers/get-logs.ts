import { HttpHandler } from '../../../util/arch/handler';
import { GetLogsRequest as Request, GetLogsResponse as Response } from '../api/definitions/controllers';
import * as R from '../repositories'
import { IController } from '../../../util/arch/controller';
import { getLogsRequestSchema } from '../api/definitions/schemas';
import { number } from 'zod';



export class GetLogsController
    extends HttpHandler<Request, Response>
    implements IController {
    constructor(
        private readonly getLogs: R.GetLogs,
        private readonly logs: R.InsertLogs
    ) {
        super({
            requestSchema: getLogsRequestSchema,
            logger: { filename: __filename },
        })
    }

    async execute(params: Request): Promise<any> {
        let limit = Number(params.queryStringParameters.limit)

        if (!limit) limit = 5

        const aux: any = this.log.debug('response', limit)

        this.logs.execute({ path: aux.path, route: aux.route, data: aux.data })

        const response = await this.getLogs.execute({ limit })

        return this.http.ok({ response })
    }

}