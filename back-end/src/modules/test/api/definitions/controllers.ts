import { z } from "zod"
import { requestSchemas } from "./schemas"



export type TestRequest = z.infer<typeof requestSchemas.test>

export type TestResponse = {
    statusCode: 200
    body: {test:string}
  }

  export type PostgresRequest = z.infer<typeof requestSchemas.postgres>

export type PostgresResponse = {
    statusCode: 200
    body: {test:string}
  }