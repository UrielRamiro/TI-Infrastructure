import { SqlLog, SqlRepositoryMethod } from '../../../../util/arch/sql-method'
import { IPgHelper } from '../../../../util/sql/pg-interfaces'
import { IPgTransactionCommit } from '../../api/definitions/repositories'

export class CommitTransaction extends SqlRepositoryMethod<IPgTransactionCommit> {
  constructor(pgHelper: IPgHelper) {
    super(pgHelper, __filename)
  }

  async execute(): Promise<void> {
    const text = `END;`
    await this.query({ text }, SqlLog.All)
  }
}
