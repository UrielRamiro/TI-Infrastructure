import path from 'path'
import { winstonLogger } from './winston-logger'
import { rootPath } from '../../config/paths'
import { als } from '../../config/async-local-storage'
import { SqlLog, SqlRepositoryMethod } from '../arch/sql-method'
import { IPgHelper } from '../sql/pg-interfaces'
import { InserLogs } from '../sql/insert-logs'

export type LoggingFunction = <T>(
  message?: T,
  metadata?: T extends string ? any : never
) => void

export interface ILogger {
  error: LoggingFunction
  warn: LoggingFunction
  info: LoggingFunction
  debug: LoggingFunction
}

type LoggingContext = {
  filepath?: string
}

type Level = 'debug' | 'info' | 'warn' | 'error'


function makeLoggingFunction(
  level: Level,
  context: LoggingContext
): LoggingFunction {
  return <T>(message?: T, metadata?: T extends string ? any : never) => {
    const alsStore = als.getStore()
    const route = alsStore?.route
    const requestId = alsStore?.requestId

    const isMessageText = typeof message === 'string'
    const text = isMessageText ? message : ''

    const meta: Record<string, any> = {}

    if (context.filepath) {
      const relativePath = path.relative(rootPath, context.filepath)
      meta.path = relativePath.endsWith('.js')
        ? relativePath.replace('.js', '.ts')
        : relativePath
    }
    if (route) {
      meta.route = route
    }

    if (requestId) {
      meta.requestId = requestId
    }

    if (message instanceof Error) {
      meta.stack = message.stack
      return winstonLogger[level](message.message, meta)

    }

    if (!isMessageText || metadata !== undefined) {
      meta.data = isMessageText ? metadata : message
    }
    const log = { path: meta.path, route: meta.route, data: meta.data }
    //await InserLogs(log)
    winstonLogger[level](text, meta)
    return log
  }
}

export function createLogger(filepath?: string): ILogger | any {
  const context: LoggingContext = {
    filepath
  }

  const log = {
    error: makeLoggingFunction('error', context),
    warn: makeLoggingFunction('warn', context),
    info: makeLoggingFunction('info', context),
    debug: makeLoggingFunction('debug', context)
  }

  return log
}

export const logger = createLogger()
