import { allowedDomains } from '../../config/cors'
import { HttpResponse } from './http'

export type ApiErrorResponseBody = {
  errorCode: string
  errorMessage?: string
  displayTitle?: string
  displayMessage?: string
}

export type CustomErrorProps = { statusCode?: number } & ApiErrorResponseBody

export class CustomError extends Error {
  constructor(protected readonly props: CustomErrorProps) {
    super(props.errorMessage)
  }

  toHttpResponse(origin: string): HttpResponse {
    const allowedOrigin = allowedDomains.includes(origin) ? origin : '-'
    return {
      statusCode: this.props.statusCode ?? 500,
      body: this.info,
      headers: { 'Access-Control-Allow-Origin': allowedOrigin }
    }
  }

  protected get info() {
    const { errorCode, errorMessage, displayTitle, displayMessage } = this.props
    return { errorCode, errorMessage, displayTitle, displayMessage }
  }
}

export class ServerError extends CustomError {
  constructor() {
    super({
      statusCode: 500,
      errorCode: 'SERVER_ERROR',
      errorMessage: 'Internal Server Error',
      displayTitle: 'Ocorreu um erro inesperado',
      displayMessage: 'Ocorreu um erro inesperado'
    })
  }
}

export class ForbiddenError extends CustomError {
  constructor(message: string) {
    super({
      statusCode: 403,
      errorCode: 'FORBIDDEN_ERROR',
      errorMessage: 'Forbidden error: ' + message,
      displayTitle: 'Acesso não permitido',
      displayMessage: 'Acesso não permitido'
    })
  }
}

export class NotFoundError extends CustomError {
  constructor() {
    super({
      statusCode: 404,
      errorCode: 'NOT_FOUND_ERROR',
      errorMessage: 'Not found error',
      displayTitle: 'Não encontrado',
      displayMessage: 'Não encontrado'
    })
  }
}

export class BadRequest extends CustomError {
  constructor(message: string) {
    super({
      statusCode: 400,
      errorCode: 'BAD_REQUEST',
      errorMessage: 'Bad request',
      displayTitle: 'Requisição inválida',
      displayMessage: message || 'Requisição inválida'
    })
  }
}

export class MissingParamError extends CustomError {
  constructor(...params: string[]) {
    const s = params.join(', ')
    super({
      statusCode: 400,
      errorCode: 'MISSING_PARAM_ERROR',
      errorMessage: 'Missing input parameter(s): ' + s,
      displayTitle: 'Campos não preenchidos',
      displayMessage: 'Os seguintes campos requerem um valor: ' + s
    })
  }
}

export class UnprocessableEntityError extends CustomError {
  constructor(...params: string[]) {
    const s = params.join(', ')
    super({
      statusCode: 422,
      errorCode: 'UNPROCESSABLE_ENTITY_ERROR',
      errorMessage: 'Invalid input parameter(s): ' + s,
      displayTitle: 'Campos com valores inválidos',
      displayMessage: 'Os seguintes campos contêm valores inválidos: ' + s
    })
  }
}

export class ConflictError extends CustomError {
  constructor(params?: string, displayParams?: string) {
    const displayData = displayParams || params
    const displayDetails = displayData ? ': ' + displayData : ''
    const errorDetails = params ? ': ' + params : ''
    super({
      statusCode: 400,
      errorCode: 'CONFLICT_ERROR',
      errorMessage: 'Conflict error' + errorDetails,
      displayTitle: 'Problema no processamento',
      displayMessage:
        'Ocorreu um problema no processamento da requisição' + displayDetails
    })
  }
}
