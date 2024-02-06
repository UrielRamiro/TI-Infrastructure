import { HttpHandler } from '../../../util/arch/handler';
import {
    PostgresRequest as Request,
    PostgresResponse as Response
} from '../api/definitions/controllers'
import { IController } from '../../../util/arch/controller';
import { postgresRequestSchema } from '../api/definitions/schemas';
import * as R from '../repositories'
import { InsertLogs } from '../../statusckeck/repositories';


export class PostgresController
    extends HttpHandler<Request, Response>
    implements IController {
    constructor(
        private readonly postgres: R.IPostgresRepository,
        private readonly logs: InsertLogs
    ) {
        super({
            requestSchema: postgresRequestSchema,
            logger: { filename: __filename },
        })
    }

    async execute(request: Request): Promise<any> {
        const response = await this.postgres.get({ id: 1 })

        const aux: any = this.log.debug('response', response)

        this.logs.execute({ path: aux.path, route: aux.route, data: aux.data })

        return this.http.noContent()
    }

}