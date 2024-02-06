import { PoolClient } from 'pg'
import { SqlLog, SqlRepositoryMethod } from '../../../../util/arch/sql-method'
import { IPgHelper } from '../../../../util/sql/pg-interfaces'
import { IPgTransactionStart } from '../../api/definitions/repositories'

export class StartTransaction extends SqlRepositoryMethod<IPgTransactionStart> {
  constructor(pgHelper: IPgHelper) {
    super(pgHelper, __filename)
  }

  async execute(): Promise<void> {
    const text = `BEGIN; `
    await this.query({ text }, SqlLog.All)
  }
}
