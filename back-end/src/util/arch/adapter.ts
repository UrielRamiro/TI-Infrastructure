import { randomUUID } from 'node:crypto'
import { Request, Response, RequestHandler } from 'express'
import { allowedDomains } from '../../config/cors'
import { IController } from './controller'
import { HttpRequest } from '../http/http'
import { als } from '../../config/async-local-storage'
import { requestLogger } from '../tools/request-logger'

export function adaptRoute(controller: IController): RequestHandler {
  return async (req: Request, res: Response) => {
    const origin = req.headers?.origin ?? ''

    const store = {
      requestId: randomUUID(),
      route: req.method + ' ' + req.route.path
    }

    const httpRequest = {
      headers: req.headers,
      pathParameters: req.params,
      queryStringParameters: req.query,
      body: req.body,
      context: req.context ?? {}
    } satisfies HttpRequest

    //requestLogger.info('request', { data: { ...httpRequest }, ...store })

    const httpResponse = await als.run(store, async () => {
      return await controller.handle(httpRequest)
    })

    //requestLogger.info('response', { data: { ...httpResponse }, ...store })

    res
      .status(httpResponse.statusCode)
      .header(
        'Access-Control-Allow-Origin',
        allowedDomains.includes(origin) ? origin : '-'
      )

    for (const headerName in httpResponse.headers) {
      res.header(headerName, httpResponse.headers[headerName])
    }

    if (httpResponse.body) return res.json(httpResponse.body)

    return res.send()
  }
}
