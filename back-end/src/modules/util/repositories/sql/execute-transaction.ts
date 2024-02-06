import { als } from '../../../../config/async-local-storage'
import { SqlRepositoryMethod } from '../../../../util/arch/sql-method'
import { IPgHelper } from '../../../../util/sql/pg-interfaces'

export class Transaction extends SqlRepositoryMethod<any> {
  constructor(pgHelper: IPgHelper) {
    super(pgHelper, __filename)
  }

  async execute<R>(fn: () => Promise<R>) {
    const currentAlsStore = als.getStore()! // FIXME types
    const pgClient = await this.pgHelper.connectClient()
    try {
      const alsStore = {
        pgClient,
        ...currentAlsStore
      }

      await pgClient.query('BEGIN;')

      const result = await als.run(alsStore, fn)

      await pgClient.query('COMMIT;')

      return result
    } catch (e) {
      this.log.error('execute transaction failed', e)
      await pgClient.query('ROLLBACK;')
      throw e
    }
  }
}
