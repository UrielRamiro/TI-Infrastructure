import { z } from 'zod'

export const statusCheckRequestSchema = z.object({
    queryStringParameters: z.object({ test: z.string().optional() })
})

export const getLogsRequestSchema = z.object({
    queryStringParameters: z.object({ limit: z.string().optional() })
})

export const requestSchemas = {
    statusCheck: statusCheckRequestSchema,
    getLogs: getLogsRequestSchema
}