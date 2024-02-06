import * as C from '../../controllers'
import * as R from './repositories'

export const makeCheckStatusController = () =>
    new C.CheckStatusController(R.makeCheckStatus(), R.makeCheckDatabaseStatus(), R.makeInsertLogs())

export const makeGetLogsController = () => new C.GetLogsController(R.makeGetLogs(), R.makeInsertLogs())