import { IController } from './controller'
import { HttpHandler } from './handler'
import { HttpRequest, HttpResponse } from '../http/http'
import { httpRequestSchema } from './schemas'

export class MockController extends HttpHandler implements IController {
  constructor(
    private readonly mockHandler?: (req: HttpRequest) => HttpResponse
  ) {
    super({ requestSchema: httpRequestSchema })
  }

  async execute(req: HttpRequest): Promise<HttpResponse> {
    if (this.mockHandler) return this.mockHandler(req)
    return { statusCode: 501 }
  }
}
