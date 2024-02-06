
import { PoolClient } from 'pg'

// PgTransaction

export interface IPgTransactionStart {
  execute(): Promise<void>
}

export interface IPgTransactionCommit {
  execute(): Promise<void>
}

export interface IPgTransactionRollback {
  execute(): Promise<void>
}

export interface IPgTransactionExecute {
  execute<R>(fn: () => Promise<R>): Promise<R>
}

export interface IPgTransaction {
  start: IPgTransactionStart['execute']
  commit: IPgTransactionCommit['execute']
  rollback: IPgTransactionRollback['execute']
  execute: IPgTransactionExecute['execute']
}
