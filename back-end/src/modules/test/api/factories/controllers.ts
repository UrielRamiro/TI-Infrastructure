import { makeGetLogs } from '../../../statusckeck/api/factories/repositories'
import * as C from '../../controllers'
import { makePostgresRepository } from './repositories'

export const makeTestController = () =>
    new C.TestController(makeGetLogs())

export const makePostgresController = () =>
    new C.PostgresController(makePostgresRepository(), makeGetLogs())