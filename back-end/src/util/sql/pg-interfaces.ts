import { DatabaseError, Pool, PoolClient, QueryResult } from 'pg'

export type QueryParams = {
  text: string
  values?: { [key: string]: any } | any[]
  name?: string
  client?: PoolClient
}

export type PgHelperLoggerConfig = {
  filename: string
}

export interface IPgHelper {
  connectClient(): Promise<PoolClient>
  query(params: QueryParams): Promise<QueryResult>
}

export type PgHelperError = DatabaseError
