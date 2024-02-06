import {
  Client,
  Pool,
  PoolClient,
  PoolConfig,
  QueryConfig,
  QueryResult,
  types
} from 'pg'
import { als } from '../../config/async-local-storage'
import { createLogger, ILogger } from '../tools/logger'
import { IPgHelper, QueryParams } from './pg-interfaces'

types.setTypeParser(types.builtins.INT8, value => parseInt(value, 10))
types.setTypeParser(types.builtins.FLOAT8, value => parseFloat(value))
types.setTypeParser(types.builtins.NUMERIC, value => parseFloat(value))

export class PgHelper implements IPgHelper {
  private readonly log: ILogger
  public readonly pool: Pool
  private client: PoolClient | undefined

  constructor(config: PoolConfig) {
    this.log = createLogger(__filename)

    this.pool = new Pool(config)
  }

  async connectClient() {
    const client = this.pool.connect()
    return client
  }

  async query(params: QueryParams): Promise<QueryResult> {
    const { text, values, name } = params

    const query = Array.isArray(values)
      ? { text, values, name }
      : this.formatQuery({ text, values, name })

    const client = als.getStore()?.pgClient

    if (client) {
      return await client.query(query)
    }
    return await this.pool.query(query)
  }

  private formatQuery(params: QueryParams): QueryConfig {
    let text = params.text
    const values = []

    const entries = Object.entries(params.values ?? {})

    const sortFunction = ([a]: [string, any], [b]: [string, any]) =>
      b.length - a.length

    entries.sort(sortFunction)

    for (const [key, value] of entries) {
      const pattern = '$' + key
      if (text.includes(pattern)) {
        if (value === undefined) {
          this.log.warn('Query value undefined', { key })
        }
        values.push(value)
        const index = '$' + values.length
        text = text.replaceAll(pattern, index)
      } else if (value !== undefined) {
        this.log.warn('Query missing pattern', { pattern })
      }
    }

    return { text, values }
  }
}
