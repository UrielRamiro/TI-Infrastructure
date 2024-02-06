import { RouterConfig } from '../../../util/arch/routing'
import * as factory from './factories/controllers'


export const healtCheckConfig = {
    routes: {
        '/health-check': {
            get: factory.makeCheckStatusController()
        },
        '/get-logs': {
            get: factory.makeGetLogsController()
        }
    }
} satisfies RouterConfig