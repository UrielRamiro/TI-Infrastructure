import { HttpRequest, HttpResponse } from '../http/http'

export interface IController {
  handle: (httpRequest: HttpRequest) => Promise<HttpResponse>
}
