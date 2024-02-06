import { HttpRequestContext } from './util/http/http'

declare global {
  namespace NodeJS {
    interface ProcessEnv {

    }
  }
}

declare global {
  namespace Express {
    interface Request {
      context?: HttpRequestContext
    }
  }
}

export {}
