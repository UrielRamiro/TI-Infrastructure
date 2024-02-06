import { SqlLog, SqlRepositoryMethod } from '../../../../util/arch/sql-method'
import { IPgHelper } from '../../../../util/sql/pg-interfaces'
import { IPgTransactionRollback } from '../../api/definitions/repositories'

export class RollbackTransaction extends SqlRepositoryMethod<IPgTransactionRollback> {
  constructor(pgHelper: IPgHelper) {
    super(pgHelper, __filename)
  }

  async execute(): Promise<void> {
    const text = `ROLLBACK;`
    await this.query({ text }, SqlLog.All)
  }
}
