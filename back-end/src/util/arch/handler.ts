import { ZodError, ZodSchema, ZodTypeDef } from 'zod'
import { IController } from './controller'
import { HttpRequest, HttpResponse } from '../http/http'
import { CustomError, ServerError } from '../http/error'
import { httpResponses } from '../http/responses'
import { makeZodErrorMessage } from '../tools/zod-util'
import { createLogger, ILogger } from '../tools/logger'

type Schema<Output, Input> = ZodSchema<Output, ZodTypeDef, Input>

export type HttpHandlerParams<Request, Response> = {
  requestSchema: Schema<Request, Partial<HttpRequest>>
  responseSchema?: Schema<HttpResponse, Response>
  auth?: { checks?: ((req: HttpRequest) => Promise<boolean>)[] }
  isProject?: { checks?: ((req: HttpRequest) => Promise<boolean>)[] }
  logger?: { filename?: string }
}

export abstract class HttpHandler<
  Request extends Partial<HttpRequest> = {},
  Response extends HttpResponse = HttpResponse
> implements IController {
  private readonly requestSchema
  private readonly responseSchema
  private readonly logger

  constructor(params: HttpHandlerParams<Request, Response>) {
    this.requestSchema = params.requestSchema
    this.responseSchema = params.responseSchema
    this.logger = params.logger

    this.log = createLogger(this.logger?.filename)
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const origin = httpRequest.headers.origin
    try {
      this.log.debug('request', {
        pathParameters: httpRequest.pathParameters,
        queryStringParameters: httpRequest.queryStringParameters,
        body: httpRequest.body,
        context: httpRequest.context
      })

      const parsedRequest = this.requestSchema.safeParse(httpRequest)
      if (!parsedRequest.success) {
        return this.makeValidationError(parsedRequest.error)
      }
      const request = parsedRequest.data

      const result = await this.execute(request)

      if (this.responseSchema) {
        const parsedResponse = this.responseSchema.safeParse(result)
        if (!parsedResponse.success) {
          this.log.error(this.makeValidationError(parsedResponse.error))
          return new ServerError().toHttpResponse(origin)
        }
      }

      this.log.debug('response', result)

      return result
    } catch (error) {
      this.log.error(error)
      if (error instanceof CustomError) return error.toHttpResponse(origin)
      return new ServerError().toHttpResponse(origin)
    }
  }

  protected abstract execute(request: Request): Promise<Response>

  protected log: ILogger

  protected http = httpResponses

  private makeValidationError(e: ZodError): HttpResponse {
    const message = makeZodErrorMessage(e)
    return this.http.badRequest(message)
  }

}
