import { RouterConfig } from '../../../util/arch/routing'
import * as factory from './factories/controllers'


export const testConfig = {
    routes:{
        '/teste':{
            get: factory.makeTestController()
        },
        '/postgres':{
            get: factory.makePostgresController()
        },
    }
} satisfies RouterConfig