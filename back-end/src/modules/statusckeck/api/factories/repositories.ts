import { httpClient } from '../../../../util/http/http-client'
import { pgInfra } from '../../../../util/sql/databases'
import { PgHelper } from '../../../../util/sql/pg-helper'
import { makePgTransactionServices } from '../../../util/api/factories/repositories'
import * as R from '../../repositories'


export const makeCheckStatus = () => new R.CheckStatus(httpClient)

export const makeCheckDatabaseStatus = () => new R.CheckDatabaseStatus(pgInfra)

export const makeInsertLogs = () => new R.InsertLogs(pgInfra)

export const makeGetLogs = () => new R.GetLogs(pgInfra)