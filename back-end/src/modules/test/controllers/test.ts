import { HttpHandler } from '../../../util/arch/handler';
import {
    TestRequest as Request,
    TestResponse as Response
} from '../api/definitions/controllers'
import { IController } from '../../../util/arch/controller';
import { testRequestSchema } from '../api/definitions/schemas';
import { InsertLogs } from '../../statusckeck/repositories';


export class TestController
    extends HttpHandler<Request, Response>
    implements IController {
    constructor(private readonly logs: InsertLogs) {
        super({
            requestSchema: testRequestSchema,
            logger: { filename: __filename },
        })
    }

    async execute(request: Request): Promise<Response> {
        const response = { test: 'teste' }

        const aux: any = this.log.debug('response', response)

        this.logs.execute({ path: aux.path, route: aux.route, data: aux.data })

        return this.http.ok(response)
    }
}