import { IRepositoryMethod } from './repository'
import { IPgHelper, QueryParams } from '../sql/pg-interfaces'
import { createLogger, ILogger } from '../tools/logger'

export abstract class SqlMethod implements IRepositoryMethod<any, any> {
  constructor(protected readonly pgHelper: IPgHelper, filename?: string) {
    this.log = createLogger(filename)
  }

  protected async query(
    params: QueryParams,
    logQuery: boolean = false,
    logValues: boolean = false,
    logResult: boolean = false
  ): Promise<any[]> {
    if (logQuery) this.log.debug('query', params.text)
    if (logValues) this.log.debug('values', params.values)

    let result

    try {
      result = await this.pgHelper.query(params)
    } catch (e) {
      this.log.error(e)
      throw e
    }

    if (logResult) await this.log.debug('result', result.rows)

    return result?.rows ?? []
  }

  abstract execute(params: any): Promise<any>

  protected log: ILogger
}

export enum SqlLog {
  None = 0,
  Query = 1 << 0,
  Values = 1 << 1,
  Result = 1 << 2,
  All = ~(~0 << 3)
}

export abstract class SqlRepositoryMethod<
  T extends IRepositoryMethod<any, any>
> {
  protected log: ILogger

  constructor(protected pgHelper: IPgHelper, filename: string) {
    this.log = createLogger(filename)
  }

  abstract execute(
    ...params: Parameters<T['execute']>
  ): ReturnType<T['execute']>

  protected async query(params: QueryParams, logs?: SqlLog): Promise<any[]> {
    if (logs && (logs & SqlLog.Query) === SqlLog.Query) {
      this.log.debug('query text', params.text)
    }

    if (logs && (logs & SqlLog.Values) === SqlLog.Values) {
      this.log.debug('query values', params.values)
    }

    let result

    try {
      result = await this.pgHelper.query(params)
    } catch (e) {
      this.log.error(e)
      throw e
    }

    if (logs && (logs & SqlLog.Result) === SqlLog.Result) {
      this.log.debug('query result', result.rows)
    }

    return result?.rows ?? []
  }
}
