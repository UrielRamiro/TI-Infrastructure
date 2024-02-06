import { z } from 'zod'

export const testRequestSchema = z.object({
  queryStringParameters: z.object({test: z.string().optional()})
})

export const postgresRequestSchema = z.object({
  queryStringParameters: z.object({test: z.string().optional()})
})


export const requestSchemas = {
    test: testRequestSchema,
    postgres: postgresRequestSchema
}