import { HttpHandler } from '../../../util/arch/handler';
import { statusCheckRequestSchema } from '../api/definitions/schemas';
import { CheckStatusRequest as Request, CheckStatusResponse as Response } from '../api/definitions/controllers';
import * as R from '../repositories'
import { IController } from '../../../util/arch/controller';
import { IPgTransaction } from '../../util/api/definitions/repositories';



export class CheckStatusController
    extends HttpHandler<Request, Response>
    implements IController {
    constructor(private readonly check: R.CheckStatus,
        private readonly checkDatabase: R.CheckDatabaseStatus,
        private readonly logs: R.InsertLogs
    ) {
        super({
            requestSchema: statusCheckRequestSchema,
            logger: { filename: __filename },
        })
    }

    async execute(): Promise<any> {
        const frontResponse = await this.check.execute()
        const databaseResponse = await this.checkDatabase.execute()

        const aux: any = this.log.debug('response', databaseResponse)

        this.logs.execute({ path: aux.path, route: aux.route, data: aux.data })

        return this.http.ok({ databaseResponse, frontResponse })
    }

}