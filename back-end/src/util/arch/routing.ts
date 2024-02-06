import { IRouter, RequestHandler, Router } from 'express'
import { adaptRoute } from './adapter'
import { IController } from './controller'
import { HttpHandler } from './handler'
import { MockController } from './mock-controller'

export type RouteConfig = {
  handler: IController
  middlewares?: RequestHandler[]
}

export type RouterConfig = {
  middlewares?: {
    path: string
    handler: RequestHandler
  }[]
  routes: {
    [route: string]: {
      get?: IController | RouteConfig
      put?: IController | RouteConfig
      post?: IController | RouteConfig
      delete?: IController | RouteConfig
    }
  }
}

export function createRouter(routerConfig: RouterConfig): IRouter {
  const router = Router()

  if (routerConfig?.middlewares) {
    routerConfig.middlewares.forEach(m => {
      router.use(m.path, m.handler)
    })
  }

  const routes = routerConfig.routes

  for (const [path, configurations] of Object.entries(routes)) {
    const routerPath = path

    for (const key in configurations) {
      const method = key as keyof typeof configurations
      const config = configurations[method]!
      if (isController(config)) {
        router[method](routerPath, adaptRoute(config))
      } else {
        router[method](
          routerPath,
          config.middlewares ?? [],
          adaptRoute(config.handler)
        )
      }
    }
  }

  return router
}

function isController(config: unknown): config is IController {
  if (config instanceof HttpHandler || config instanceof MockController) {
    return true
  }
  return false
}
