import * as R from '../api/definitions/repositories'

export class PgTransactionService implements R.IPgTransaction {
  constructor(
    private readonly startTransaction: R.IPgTransactionStart,
    private readonly commitTransaction: R.IPgTransactionCommit,
    private readonly rollbackTransaction: R.IPgTransactionRollback,
    private readonly executeTransaction: R.IPgTransactionExecute
  ) {}

  async start() {
    return this.startTransaction.execute()
  }

  async commit() {
    this.commitTransaction.execute()
  }

  async rollback() {
    this.rollbackTransaction.execute()
  }

  async execute<R>(fn: () => Promise<R>) {
    return this.executeTransaction.execute<R>(fn)
  }
}
