import { z } from 'zod'

export const emptySchema = z.object({})

export const httpRequestSchema = z.object({
  headers: z.any(),
  pathParameters: z.any(),
  queryStringParameters: z.any(),
  body: z.any(),
  context: z.any()
})
