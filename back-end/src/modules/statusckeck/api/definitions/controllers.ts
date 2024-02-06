import { z } from "zod"
import { requestSchemas } from "./schemas"

export type CheckStatusRequest = z.infer<typeof requestSchemas.statusCheck>

export type CheckStatusResponse = {
    statusCode: 200
    body: { test: string }
}

export type GetLogsRequest = z.infer<typeof requestSchemas.getLogs>

export type GetLogsResponse = {
    statusCode: 200
    body: { reponse: any[] }
}
