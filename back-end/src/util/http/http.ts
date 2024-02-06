import { PoolClient } from 'pg'

export type HttpRequestContext = {
  userId?: string
}

export type HttpRequest = {
  headers: any
  pathParameters: any
  queryStringParameters: any
  body: any
  context: HttpRequestContext
}

export type HttpResponse = {
  statusCode: number
  body?: any
  headers?: any
}

export type AlsStore = {
  requestId: string
  route: string
  pgClient?: PoolClient
}
